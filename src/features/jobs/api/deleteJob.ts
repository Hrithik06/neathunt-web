import { http } from "@/services/http";

async function deleteJob(jobId: string) {
  const response = await http.request({
    method: "DELETE",
    url: `/jobs/${jobId}`,
    withCredentials: true,
  });
  return response?.data;
}
export default deleteJob;
