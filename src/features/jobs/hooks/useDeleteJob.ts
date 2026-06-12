import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteJob from "../api/deleteJob";

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteJob"],
    mutationFn: deleteJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });
}
