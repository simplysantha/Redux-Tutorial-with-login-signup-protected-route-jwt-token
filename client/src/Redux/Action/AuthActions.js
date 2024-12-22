import * as types from "../ActionTypes/ActionTypes";
import axios from "axios";

// Helper function to get token
const getToken = () => {
  return localStorage.getItem("token");
};

// Register User
export const registerUser = (userData, toast, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/register",
      userData
    );
    dispatch({ type: types.REGISTER, payload: response.data.user });
    toast.success("Signup successful! Please login.");
    callback(); // Switch to login mode
  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
  }
};

// Login User
export const loginUser = (credentials, navigate, toast) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/login",
      credentials
    );
    const { token } = response.data;

    localStorage.setItem("token", token);
    dispatch({ type: types.LOGIN, payload: response.data });
    toast.success("Login successful!");
    setTimeout(() => {
      navigate("/home");
    }, 5000); // Navigate to home page
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};

// Fetch User Profile
export const fetchProfile = (toast) => async (dispatch) => {
  try {
    const token = getToken();
    const response = await axios.get("http://localhost:5000/profile", {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: types.FETCH_PROFILE, payload: response.data.user });
  } catch (error) {
    toast.error("Failed to fetch profile. Please login again.");
    dispatch(logoutUser());
  }
};

// Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: types.LOGOUT });
};

// Deposit Action
export const DepositAction = (payload) => async (dispatch) => {
  try {
    const token = getToken();
    const res = await axios.post(`http://localhost:5000/deposit`, payload, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: types.DEPOSIT,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Withdrawn Action
export const WithdrawnAction = (payload) => async (dispatch) => {
  try {
    const token = getToken();
    const res = await axios.post(`http://localhost:5000/withdraw`, payload, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: types.WITHDRAWN,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Check Balance Action
export const CheckBalanceAction = (payload) => async (dispatch) => {
  try {
    const token = getToken();
    const res = await axios.get(`http://localhost:5000/balance`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: types.BALANCE,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
