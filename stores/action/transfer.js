import axiosClient from "utils/axios";

export const detailUser = (data) => {
  return {
    type: "DETAIL_USER",
    payload: data,
  };
};

export const transferData = (data) => {
  return {
    type: "DETAIL_TRANSFER",
    payload: data,
  };
};

export const createTransfer = (data) => {
  return {
    type: "CREATE_TRANSFER",
    payload: axiosClient.post("/transaction/transfer", data),
  };
};
