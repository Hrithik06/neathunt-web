import { useQuery } from "@tanstack/react-query";
import getAllJobs from "../api/getAllJobs";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    staleTime: 5 * 60 * 1000,
    // refetchInterval: 5 * 1000,
    queryFn: getAllJobs,
    refetchOnWindowFocus: false,

    // gcTime: 10_000,
  });
}
