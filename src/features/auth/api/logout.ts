import { http } from "@/services/http";
async function logout() {
  await http.request({
    method: "GET",
    url: "/auth/logout",
    withCredentials: true,
  });
}
export default logout;
