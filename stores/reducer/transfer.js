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
      break;

    case "DETAIL_TRANSFER":
      return {
        ...state,
        detailTransfer: action.payload,
        dateTimeTransfer: moment().format("MMM DD, YYYY - kk:mm"),
      };
      break;

    case "CREATE_TRANSFER_PENDING":
      return {
        ...state,
        isError: false,
      };
      break;

    case "CREATE_TRANSFER_FULFILLED":
      return {
        ...state,
        isError: false,
      };
      break;

    case "CREATE_TRANSFER_REJECTED":
      return {
        ...state,
        isError: true,
      };
      break;

    default: {
      return state;
    }
  }
};

export default transfer;
