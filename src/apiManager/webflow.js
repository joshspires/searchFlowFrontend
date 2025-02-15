import api from "./api";

export const getDashboardData = async (userId) => {
  console.log("userId", userId);

  const res = await api.get(`/webFlowManagementRoutes/getDashboardData/${userId}`)
  return res.data
};