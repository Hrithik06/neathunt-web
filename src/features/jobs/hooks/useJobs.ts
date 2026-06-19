import { useQuery } from "@tanstack/react-query";
import getAllJobs from "../api/getAllJobs";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    // staleTime: Infinity,
    queryFn: getAllJobs,
    gcTime: 10 * 1000,
  });
}
