import { countAdjacentBombs } from "../utils/utils";
import { Digit } from "../types";

import { useAppSelector } from "./hooks";

interface CellProps {
    isBomb: boolean;
    adjacentBombsNum: Digit;
    isRevealed: boolean;
    isEmpty: boolean;
    isFlagged: boolean;
}

const useCellProps = (index: number): CellProps => {
    const { bombs, revealed, flags } = useAppSelector(
        (state) => state.minesweeper
    );
    const isBomb: boolean = bombs.includes(index);
    const adjacentBombsNum: Digit = countAdjacentBombs(index, bombs);
    const isRevealed: boolean = revealed.includes(index);
    const isEmpty: boolean = !isBomb && adjacentBombsNum === 0;
    const isFlagged: boolean = flags.includes(index);

    return {
        isBomb,
        adjacentBombsNum,
        isRevealed,
        isEmpty,
        isFlagged
    };
};

export default useCellProps;
