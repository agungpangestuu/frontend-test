const initialState = {
  base: "",
  status: {
    cash: true,
    billed: false,
    wallet: false
  },
  login: {
    username: '',
    alreadySign: '',
    token: ''
  },
  signUp: false,
  mainPage: {
    directLocation: null,
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_ACTION":
      return { ...state, signUp: {success: true }};
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