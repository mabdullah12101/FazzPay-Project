import axiosClient from "utils/axios";

export const getDataUserById = (userId) => {
  return {
    type: "GET_DATA_USER_BY_ID",
    payload: axiosClient.get(`user/profile/${userId}`),
  };
};
