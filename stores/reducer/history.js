const initialState = {
  data: {},
  pagination: {},
  isLoading: false,
  isError: false,
  message: "",
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_HISTORY_PENDING":
      return {
        ...state,
        data: {},
        pagination: {},
        isLoading: true,
        isError: false,
        message: "",
      };
    case "GET_DATA_HISTORY_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        pagination: action.payload.data.pagination,
        isLoading: false,
      };
    case "GET_DATA_HISTORY_REJECTED":
      return {
        ...state,
        data: {},
        pagination: {},
        isLoading: false,
      };

    default: {
      return state;
    }
  }
};

export default history;
