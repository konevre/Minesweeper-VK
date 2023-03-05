import { configureStore } from "@reduxjs/toolkit";

import minesweeper from "./minesweeperSlice";

const store = configureStore({
    reducer: { minesweeper }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
