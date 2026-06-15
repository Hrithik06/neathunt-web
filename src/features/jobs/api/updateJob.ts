import { http } from "@/services/http";
import type { UpdateJobInput } from "../types";

async function updateJob(jobId: string, data: UpdateJobInput) {
  console.log("updateJob Api", data);
  const response = await http.request({
    method: "PATCH",
    url: `/jobs/${jobId}`,
    data,
    withCredentials: true,
  });
  return response?.data;
}
export default updateJob;
