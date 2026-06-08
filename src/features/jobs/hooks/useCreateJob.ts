import { useMutation, useQueryClient } from "@tanstack/react-query";
import createJob from "../api/createJob";
import type { Job } from "../types";
// import type { CreateJobInput } from "../types";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createJob"],
    mutationFn: createJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),

    onMutate: async (newJob) => {
      // 1. Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      // 2. Snapshot for rollback
      const previousJobs = queryClient.getQueryData(["jobs"]);

      // 3. Optimistically update
      queryClient.setQueryData(["jobs"], (old: Job[]) => [...old, newJob]);

      // 4. Return context
      return { previousJobs };
    },
  });
}
