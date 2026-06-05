import { useMutation, useQueryClient } from "@tanstack/react-query";
import createJob from "../api/createJob";
// import type { CreateJobInput } from "../types";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createJob"],
    mutationFn: createJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),

    // onMutate: async (newUser) => {
    //   // 1. Cancel ongoing queries
    //   await queryClient.cancelQueries({ queryKey: ["users"] });

    //   // 2. Snapshot for rollback
    //   const previousUsers = queryClient.getQueryData(["users"]);

    //   // 3. Optimistically update
    //   queryClient.setQueryData(["users"], (old) => [...old, newUser]);

    //   // 4. Return context
    //   return { previousUsers };
    // },
  });
}
