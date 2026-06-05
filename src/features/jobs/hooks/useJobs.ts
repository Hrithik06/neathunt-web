import { useQuery } from "@tanstack/react-query";
import getAllJobs from "../api/getAllJobs";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
  });
}
