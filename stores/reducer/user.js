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
    case "GET_DATA_USER_BY_ID_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };
    case "GET_DATA_USER_BY_ID_REJECTED":
      return {
        ...state,
        data: {},
        isLoading: false,
      };

    case "UPDATE_IMAGE_BY_ID_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "UPDATE_IMAGE_BY_ID_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_IMAGE_BY_ID_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.msg,
      };
    }

    case "UPDATE_PASSWORD_BY_ID_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "UPDATE_PASSWORD_BY_ID_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_PASSWORD_BY_ID_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.msg,
      };
    }

    case "CHECK_PIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "CHECK_PIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "CHECK_PIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.msg,
      };
    }

    case "UPDATE_PIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "UPDATE_PIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_PIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.msg,
      };
    }

    case "UPDATE_PHONE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
      };
    }
    case "UPDATE_PHONE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.msg,
      };
    }
    case "UPDATE_PHONE_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.msg,
      };
    }

    default: {
      return state;
    }
  }
};

export default user;
