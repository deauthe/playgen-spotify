import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; // Adjust path as needed

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
