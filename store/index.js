import { configureStore } from "@reduxjs/toolkit";
import likeSlice from "./like-slice";


const store = configureStore({
    reducer: {
        like: likeSlice.reducer,
    }
})

export default store;