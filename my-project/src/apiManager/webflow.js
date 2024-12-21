import api from "./api";

export const getDashboardData = async (userId) => {
  const res = await api.get(`/webFlowManagementRoutes/getDashboardData/${userId}`)
  return res.data
};