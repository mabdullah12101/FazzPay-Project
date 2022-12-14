import axiosClient from "utils/axios";

export const loadingPage = () => {
  return {
    type: "LOADING_PAGE",
    payload: true,
  };
};

export const finishLoadingPage = () => {
  return {
    type: "FINISH_LOADING_PAGE",
    payload: false,
  };
};

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

export const resetTransferData = () => {
  return {
    type: "RESET_TRANSFER_DATA",
  };
};

export const createTransfer = (data) => {
  return {
    type: "CREATE_TRANSFER",
    payload: axiosClient.post("/transaction/transfer", data),
  };
};
