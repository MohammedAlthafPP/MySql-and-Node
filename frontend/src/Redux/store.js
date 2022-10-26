import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, userListActionReducer, userReducer } from "./reducer/userReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    allUsers:allUsersReducer,
    userListAction : userListActionReducer,
  },
});

export default Store;
