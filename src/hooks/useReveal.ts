import { revealCells, setFlag } from "../store/minesweeperSlice";
import { checkCells } from "../utils/utils";
import { useAppDispatch, useAppSelector } from "./hooks";

interface UseRevealProps {
    onFlag: (index: number) => void;
    onReveal: (index: number) => void;
    revealEmptyCells: (index: number, bombs: number[]) => void;
}

const useReveal = (): UseRevealProps => {
    const dispatch = useAppDispatch();
    const { flags, isGameOver, revealed } = useAppSelector(
        (state) => state.minesweeper
    );

    const onFlag = (index: number): void => {
        const isFlagged: boolean = flags.includes(index);
        if (isFlagged) {
            dispatch(setFlag(flags.filter((item) => item !== index)));
        } else {
            if (!isGameOver) dispatch(setFlag([...flags, index]));
        }
    };

    const onReveal = (index: number): void => {
        const isRevealed: boolean = revealed.includes(index);
        if (!isRevealed && !isGameOver) {
            dispatch(revealCells([...revealed, index]));
        }
    };

    const revealEmptyCells = (index: number, bombs: number[]): void => {
        const revealedCopy: number[] = [...revealed];
        checkCells(index, revealedCopy, bombs);
        dispatch(setFlag(flags.filter((flag) => !revealedCopy.includes(flag))));
        dispatch(revealCells(revealedCopy));
    };

    return {
        onFlag,
        onReveal,
        revealEmptyCells,
    };
};

export default useReveal;
