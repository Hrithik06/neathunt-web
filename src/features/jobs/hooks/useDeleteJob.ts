import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteJob from "../api/deleteJob";
import type { Job } from "../types";

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteJob"],
    mutationFn: deleteJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
    onMutate: async (deleteId) => {
      // 1. Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      // 2. Snapshot for rollback
      const previousJobs = queryClient.getQueryData(["jobs"]);

      // 3. Optimistically update
      queryClient.setQueryData(["jobs"], (old: Job[]) =>
        old.filter((o) => o.id !== deleteId),
      );

      // 4. Return context
      return { previousJobs };
    },
  });
}
