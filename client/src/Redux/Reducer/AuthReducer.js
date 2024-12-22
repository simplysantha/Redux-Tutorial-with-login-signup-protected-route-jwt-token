import * as types from "../ActionTypes/ActionTypes";

const initialState = {
  isAuthenticated: false,
  user: null
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.REGISTER:
      return state; // Registration does not affect state immediately
    case types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user
      };
    case types.FETCH_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case types.DEPOSIT:
    case types.WITHDRAWN:
    case types.BALANCE:
      return {
        ...state,
        user: {
          ...state.user, // Preserve other user fields
          balance: payload.balance // Update only the balance
        }
      };
    default:
      return state;
  }
};
