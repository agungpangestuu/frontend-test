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

export const DetailList = (data) => ({
  type: "DETAILLIST_ACTION",
  payload: {
    data
  }
});

export const Search = (data) => ({
  type: "SEARCH_ACTION",
  payload: {
    data
  }
});

export const LocationUser = (data) => ({
  type: "LOCATION_ACTION",
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
          let objLogin = {
            token: data.token,
            alreadyLogin: true,
            username: obj.username,
            password: obj.password,
            bookmark: data.bookmark,
            recent: data.recent,
            id: data._id
          }
          AsyncStorage.setItem("credential", JSON.stringify(objLogin))
            .then(result => {
               console.log('ini data login: ', result)
              dispatch(LoginAction(objLogin));
              resolve(objLogin);
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
          reject(false);
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
        dispatch(Search(data))
        resolve(data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
}

export const getNearest = (lat, long) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://Hapi-aja.herokuapp.com/saloncategory?lat=${lat}&long=${long}`, {headers: {'Authorization': `Bearer ${getState().login.token}`}})
      .then( ({ data }) => {
        dispatch(Search(data))
        resolve(data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
}

export const postBookmark = (userId, salonId) => {
  return (dispatch, getState) => {
    
    // return new Promise((resolve, reject) => {
      axios.post(`http://Hapi-aja.herokuapp.com/bookmark`, { user_id: userId, salon_id: salonId}, {headers: {'Authorization': `Bearer ${getState().login.token}`}})
      .then( ({ data }) => {
        AsyncStorage.getItem('credential').then(result => {
          result = JSON.parse(result)
          let tempData = result.bookmark.filter(item => {
            return item._id === salonId
          })
          if(tempData.length > 0) {
             let resultFilter = result.bookmark.filter( item => item._id !== salonId )
             result.bookmark = resultFilter
             AsyncStorage.setItem('credential', JSON.stringify(result)).then(hasil => {
              console.log(hasil)
            })

          } else {
            result.bookmark.push(userId)
            AsyncStorage.setItem('credential', JSON.stringify(result)).then(hasil => {
              console.log(hasil)
            })
          }
        })
        // resolve(data)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    // })
  }
}

export const postRecent = (userId, salonId) => {
  return (dispatch, getState) => {
    
    // return new Promise((resolve, reject) => {
      axios.post(`http://Hapi-aja.herokuapp.com/recent`, { user_id: userId, salon_id: salonId}, {headers: {'Authorization': `Bearer ${getState().login.token}`}})
      .then( ({ data }) => {
        console.log('ini data post bookmark',data)
        // AsyncStorage.getItem('credential').then(result => {
        //   result = JSON.parse(result)
        //   result.bookmark.push(userId)
        //   AsyncStorage.setItem('credential', JSON.stringify(result)).then(hasil => {
        //     console.log(hasil)
        //   })
        // })
        // resolve(data)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    // })
  }
}
