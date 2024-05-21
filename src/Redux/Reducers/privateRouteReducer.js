import { LOGIN_SUCCESS, LOGOUT } from "../actionItems";

// Check if user credentials are present in localStorage
const isUserLoggedIn = !!localStorage.getItem("token");

const initialState = {
  isAuth: isUserLoggedIn,
};

export const privateRouteReducer = (state = initialState, { type }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return { isAuth: true };
    case LOGOUT:
      return { isAuth: false };
    default:
      return state;
  }
};
