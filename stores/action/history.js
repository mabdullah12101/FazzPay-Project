import axiosClient from "utils/axios";

export const getDataHistory = () => {
  return {
    type: "GET_DATA_HISTORY",
    payload: axiosClient.get(`transaction/history?page=1&limit=4&filter=WEEK`),
  };
};
