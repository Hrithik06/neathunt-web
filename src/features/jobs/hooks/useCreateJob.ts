import { useMutation, useQueryClient } from "@tanstack/react-query";
import createJob from "../api/createJob";
// import { showToast } from "@/components/ui/showToast";

export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createJob"],
    mutationFn: createJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),

    // onError: (error) =>
    //   showToast(
    //     error.message || "Couldn't save application. Please try again.",
    //     "error",
    //   ),
  });
}
