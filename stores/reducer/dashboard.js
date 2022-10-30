const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_DASHBOARD_PENDING":
      return {
        ...state,
        data: {},
        isLoading: true,
        isError: false,
        message: "",
      };
    case "GET_DATA_DASHBOARD_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "GET_DATA_DASHBOARD_REJECTED":
      return {
        ...state,
        data: {},
        isLoading: false,
      };

    default: {
      return state;
    }
  }
};

export default dashboard;
