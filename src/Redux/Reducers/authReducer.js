import { Email, Password, LOGIN_SUCCESS, LOGOUT } from "../actionItems";

const initialState = {
  email: "",
  password: "",
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Email:
      return { ...state, email: payload };
    case Password:
      return { ...state, password: payload };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId,
        isAuthenticated: true,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return { ...state, token: null, userId: null, isAuthenticated: false };
    default:
      return state;
  }
};
