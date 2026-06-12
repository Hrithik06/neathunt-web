import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "../api/getCurrentUser";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
}
