import React, { useState } from "react";
import { countAdjacentBombs } from "../utils/utils";
import { useAppSelector } from "./hooks";

interface CellProps {
    isBomb: boolean;
    adjacentBombsNum: number;
    isRevealed: boolean;
    isEmpty: boolean;
    isFlagged: boolean;
}

const useCellProps = (index: number): CellProps => {
    const { bombs, revealed, flags, isStarted, isGameOver } = useAppSelector(
        (state) => state.minesweeper
    );
    const isBomb: boolean = bombs.includes(index);
    const adjacentBombsNum: number = countAdjacentBombs(index, bombs);
    const isRevealed: boolean = revealed.includes(index);
    const isEmpty: boolean = !isBomb && adjacentBombsNum === 0;
    const isFlagged = flags.includes(index);

    return {
        isBomb,
        adjacentBombsNum,
        isRevealed,
        isEmpty,
        isFlagged,
    };
};

export default useCellProps;
