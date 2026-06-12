import { useMutation, useQueryClient } from "@tanstack/react-query";
import logout from "../api/logout";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["me"],
    mutationFn: logout,
    onSuccess: () => queryClient.setQueryData(["me"], null),
  });
}
