import { http } from "@/services/http";
async function getAllJobs() {
  const response = await http.request({
    method: "GET",
    url: "/jobs",
    withCredentials: true,
  });
  return response.data;
}
export default getAllJobs;
