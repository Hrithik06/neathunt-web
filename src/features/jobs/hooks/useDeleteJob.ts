import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteJob from "../api/deleteJob";
// import { showToast } from "@/components/ui/showToast";

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteJob"],
    mutationFn: deleteJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
    // onError: (error) =>
    //   showToast(
    //     error.message || "Failed to delete application. Please try again.",
    //     "error",
    //   ),
  });
}
