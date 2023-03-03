import { useAppDispatch, useAppSelector } from "./hooks";

const useCell = () => {
    const { isStarted, isGameOver, revealed, bombs } = useAppSelector(
        (state) => state.minesweeper
    );
};

export default useCell;
