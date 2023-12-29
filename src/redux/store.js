import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./eventReducer";

const store = configureStore({
    reducer: {
        event: rootReducer,
    },
});

export default store;
