import { http } from "@/services/http";
import type { CreateJobInput } from "../types";

async function createJob(data: CreateJobInput) {
  const response = await http.request({
    method: "POST",
    url: "/jobs",
    data,
    withCredentials: true,
  });
  return response?.data;
}
export default createJob;
