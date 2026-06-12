import { useMutation, useQueryClient } from "@tanstack/react-query";
import createJob from "../api/createJob";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createJob"],
    mutationFn: createJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });
}
