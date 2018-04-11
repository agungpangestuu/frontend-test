const initialState = {
  allCategory: null,
  search: null,
  status: {
    cash: true,
    billed: false,
    wallet: false
  },
  login: {
    username: '',
    alreadySign: '',
    token: '',
    fullname: ''
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
    case "DIRECTLOCATION_ACTIONS":
      return {
        ...state,
        mainPage: {
          directLocation: action.payload.data
        }
      };
    case "LOGIN_ACTION":
      return {
        ...state,
        login: action.payload.data
      };
    case "ALLCATEGORY_ACTION":
      return {
        ...state,
        allCategory: action.payload.data
      };
    default:
      return state;
  }
};