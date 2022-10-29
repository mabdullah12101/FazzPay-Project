import axiosClient from "utils/axios";

export const getDataUserById = (userId) => {
  return {
    type: "GET_DATA_USER_BY_ID",
    payload: axiosClient.get(`user/profile/${userId}`),
  };
};

export const updateImage = (userId, data) => {
  return {
    type: "UPDATE_IMAGE_BY_ID",
    payload: axiosClient.patch(`user/image/${userId}`, data),
  };
};
