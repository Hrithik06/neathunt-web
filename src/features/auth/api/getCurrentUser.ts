import { http } from "@/services/http";
async function getCurrentUser() {
  const response = await http.request({
    method: "GET",
    url: "/user/me",
    withCredentials: true,
  });
  return response.data;
}
export default getCurrentUser;
