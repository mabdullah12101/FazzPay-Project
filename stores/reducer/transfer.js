import moment from "moment";

const initialState = {
  user: {},
  detailTransfer: {},
  dateTimeTransfer: "",
  isError: false,
};

const transfer = (state = initialState, action) => {
  switch (action.type) {
    case "DETAIL_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "DETAIL_TRANSFER":
      return {
        ...state,
        detailTransfer: action.payload,
        dateTimeTransfer: moment().format("MMM DD, YYYY - kk:mm"),
      };

    case "RESET_TRANSFER_DATA":
      return {
        ...state,
        user: {},
        detailTransfer: {},
        dateTimeTransfer: "",
      };

    case "CREATE_TRANSFER_PENDING":
      return {
        ...state,
        isError: false,
      };

    case "CREATE_TRANSFER_FULFILLED":
      return {
        ...state,
        isError: false,
      };

    case "CREATE_TRANSFER_REJECTED":
      return {
        ...state,
        isError: true,
      };

    default: {
      return state;
    }
  }
};

export default transfer;
