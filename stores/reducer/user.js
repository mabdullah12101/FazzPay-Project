const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER_BY_ID_PENDING":
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: false,
        message: "",
      };
      break;

    case "GET_DATA_USER_BY_ID_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
      break;
    case "GET_DATA_USER_BY_ID_REJECTED":
      return {
        ...state,
        data: {},
        isLoading: false,
      };
      break;

    default: {
      return state;
    }
  }
};

export default user;
