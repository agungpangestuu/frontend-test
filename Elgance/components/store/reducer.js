const initialState = {
  base: "",
  status: {
    cash: true,
    billed: false,
    wallet: false
  },
  login: {
    username: '',
    password: ''
  },
  signUp: {
    fullname: '',
    username: '',
    password: ''
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_ACTIONS":
      return { ...state, base: action.payload.data };
    case "CASH_ACTIONS":
      return {
        ...state,
        status: {
          cash: true,
          billed: false,
          wallet: false
        }
      };
    case "BILLED_ACTIONS":
      return {
        ...state,
        status: {
          cash: false,
          billed: true,
          wallet: false
        }
      };
    case "WALLET_ACTIONS":
      return {
        ...state.status,
        cash: true
      };
    default:
      return state;
  }
};