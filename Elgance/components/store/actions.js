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

export const DirectLocation = (data) => ({
  type: "DIRECTLOCATION_ACTIONS",
  payload: {
    data
  }
});

export const isLoading = data => ({
  type: "IS_LOADING",
  payload: {
    data
  }
});

export const AllCategory = (data) => ({
  type: "ALLCATEGORY_ACTION",
  payload: {
    data
  }
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
              console.log('dateng token')
              
            })
            .catch(err => {});
            let objLogin = {
              token: data.token,
              alreadyLogin: true,
              username: obj.username
            };

            console.log(objLogin);
            dispatch(LoginAction(objLogin));
            resolve(true);
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

export const getLocations = (origin, dest) => {
  return (disoatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.long}&destinations=${destination.lat},${destinantion.long}&key=AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI`)
      .then( ({ data }) => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

export const getAllCategory = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://Hapi-aja.herokuapp.com/saloncategory`, {headers: {'Authorization': `Bearer ${getState().login.token}`}})
      .then( ({ data }) => {
        console.log('ini data all category',data)
        // JSON.parse(data)
        dispatch(AllCategory(data))
        resolve(data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
}