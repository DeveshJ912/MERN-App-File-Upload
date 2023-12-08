import userSlice from "./userSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        userState: userSlice
    },
});

export default store;