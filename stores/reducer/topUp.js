const initialState = {
  modal: false,
};

const topUp = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL":
      return {
        ...state,
        modal: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default topUp;
