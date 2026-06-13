import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateJob from "../api/updateJob";
import type { UpdateJobInput } from "../types";
// import { showToast } from "@/components/ui/showToast";

type Args = {
  jobId: string;
  data: UpdateJobInput;
};
// const updateMutateFn({ jobId, data }: Args){
//   updateJob(jobId, data)
// }
//Mutations only take one argument for variables
//worked around by using an object
export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateJob"],
    mutationFn: ({ jobId, data }: Args) => updateJob(jobId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
    // onError: (error) =>
    //   showToast(
    //     error.message || "Failed to update application. Please try again.",
    //     "error",
    //   ),
  });
}
