import axios from "axios";
import { AsyncStorage } from "react-native";

export const LoginAction = data => ({
  type: "LOGIN_ACTION",
  payload: {
    data
  }
});

export const SignupAction = () => ({
  type: "SIGNUP_ACTION"
});

export const isLoading = data => ({
  type: "IS_LOADING",
  payload: {
    data
  }
});

export const WalletAction = () => ({
  type: "Wallet_ACTION"
});

export const login_user = obj => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://Hapi-aja.herokuapp.com/user/sign_in`, obj)
        .then(({ data }) => {
          console.log("masuk");
          AsyncStorage.setItem("token", data.token)
            .then(result => {
              let objLogin = {
                token: data.token,
                alreadyLogin: true,
                username: obj.username
              };

              console.log(objLogin);
              dispatch(LoginAction(objLogin));
              resolve(true);
            })
            .catch(err => {});
        })
        .catch(err => {
          console.log(err);
          resject(false);
        });
    });
  };
};

export const signup_user = obj => {
  console.log(obj);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://Hapi-aja.herokuapp.com/user/sign_up`, obj)
        .then(({ data }) => {
          dispatch(SignupAction());
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };
};
