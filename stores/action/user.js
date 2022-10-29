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

export const updatePassword = (userId, data) => {
  return {
    type: "UPDATE_PASSWORD_BY_ID",
    payload: axiosClient.patch(`user/password/${userId}`, data),
  };
};

export const checkPin = (pin) => {
  return {
    type: "CHECK_PIN",
    payload: axiosClient.get(`user/pin/${pin}`),
  };
};

export const updatePin = (userId, pin) => {
  return {
    type: "UPDATE_PIN",
    payload: axiosClient.patch(`user/pin/${userId}`, pin),
  };
};

export const updatePhone = (userId, phone) => {
  return {
    type: "UPDATE_PHONE",
    payload: axiosClient.patch(`user/profile/${userId}`, phone),
  };
};
