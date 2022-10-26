import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CLEAR_ERRORS,
  } from "../../Constants/Constants";
  import axios from "../../axios"

// Login
export const login = (userData) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/login`, userData, config);
      if (data&&data.user) {
        await localStorage.setItem("Udetails", JSON.stringify(data.user));
      }
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    }
  };
  
  // Register
  export const registerUser = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/register`, userData,  config );
  
      if (data&&data.user) {
        await localStorage.setItem("Udetails", JSON.stringify(data.user));
      }
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data,
      });
    }
  };
  
  // Load User
  export const loadUser = () => async (dispatch) => {
    try {

      dispatch({ type: LOAD_USER_REQUEST });

      const details = JSON.parse(localStorage.getItem("Udetails"));

      if (details && Object.keys(details).length === 0) {
      } else {
        if (details && details.id) {
          const { data } = await axios.get(`/user/${details.id}`);
  
          dispatch({ type: LOAD_USER_SUCCESS, payload: data });
        
        }
      }

    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
    }
  };
  
  // Logout User
  export const logout = () => async (dispatch) => {
    try {
      await localStorage.removeItem("Udetails");
      await axios.get(`/logout`);
  
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
    }
  };
  
// Get All Users --Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(`/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data });
  }
};

// Delete User --Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
    });
  }
};




  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  