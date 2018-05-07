const initialState = {
  allCategory: null,
  search: null,
  detailList: null,
  status: {
    cash: true,
    billed: false,
    wallet: false
  },
  location: {
    lat: null,
    long: null
  },
  login: {
    username: '',
    alreadySign: '',
    token: '',
    fullname: '',
    bookmark: null,
    rescent: null,
    id: ''
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
    case "DETAILLIST_ACTION":
      return {
        ...state,
        detailList: action.payload.data
      };
    case "SEARCH_ACTION":
      return {
        ...state,
        search: action.payload.data
      };
      case "LOCATION_ACTION":
      return {
        ...state,
        location: action.payload.data
      };
    default:
      return state;
  }
};