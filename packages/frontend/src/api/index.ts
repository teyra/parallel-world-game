import http from "@/lib/request";

export const sendPlayResultAPI = async (data: any) => {
  return await http.post("/score", data);
};
export const getResultAPI = async () => {
  return await http.get("/score");
};
export const loginAPI = async (data: any) => {
  console.log("🚀 ~ loginAPI ~ data:", data);
  return await http.post("/auth/login", data);
};
