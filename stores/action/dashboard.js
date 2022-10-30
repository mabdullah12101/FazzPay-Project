import axiosClient from "utils/axios";

export const getDataDashboard = (userId) => {
  return {
    type: "GET_DATA_DASHBOARD",
    payload: axiosClient.get(`dashboard/${userId}`),
  };
};
