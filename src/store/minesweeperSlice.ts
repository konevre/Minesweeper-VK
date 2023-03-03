import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Minesweeper {
    isStarted: boolean;
    isGameOver: boolean;
    isWin: boolean;
    bombs: number[];
    revealed: number[];
    flags: number[];
}

const initialState: Minesweeper = {
    isStarted: false,
    isGameOver: false,
    isWin: false,
    bombs: [],
    revealed: [],
    flags: [],
};

const minesweeperSlice = createSlice({
    name: "minesweeper",
    initialState,
    reducers: {
        startGameToggle: (state, action: PayloadAction<boolean>) => {
            state.isStarted = action.payload;
        },
        failGameToggle: (state, action: PayloadAction<boolean>) => {
            state.isGameOver = action.payload;
        },
        winGameToggle: (state, action: PayloadAction<boolean>) => {
            state.isWin = action.payload;
        },
        setBombs: (state, action: PayloadAction<number[]>) => {
            state.bombs = action.payload;
        },
        revealCells: (state, action: PayloadAction<number[]>) => {
            state.revealed = action.payload;
        },
        setFlag: (state, action: PayloadAction<number[]>) => {
            state.flags = action.payload;
        },
    },
});

const { actions, reducer } = minesweeperSlice;
export default reducer;

export const {
    startGameToggle,
    failGameToggle,
    winGameToggle,
    setBombs,
    revealCells,
    setFlag,
} = actions;
