// the action (registration) creator
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "./type";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Since JWT is stateless, a user registers.
// we want him to stay logged in as the registration is successful
// but, reality shows that the token sent back stays there
// however, the isAuthenticated field is false
// Hence, from here on, everytime a page loads, this action creator (loadUser)
// will fire to check if there is a valid token
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data // everything about the user, except for the password
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  // we are to send data => prepare an object to hold info
  // remember the Headers tab in Postman?
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data // token sent back from back-end
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
