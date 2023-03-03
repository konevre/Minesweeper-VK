import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
    failGameToggle,
    revealCells,
    setBombs,
    setFlag,
    startGameToggle,
} from "../../store/minesweeperSlice";

import {
    checkCells,
    countAdjacentBombs,
    generateBombs,
} from "../../utils/utils";

interface CellProps {
    index: number;
    onMouseUp: () => void;
    onMouseDown: () => void;
    isMouseDown: boolean;
}

const CellComponent: React.FC<CellProps> = ({
    index,
    onMouseDown,
    onMouseUp,
    isMouseDown,
}) => {
    const { isStarted, isGameOver, revealed, bombs, flags } = useAppSelector(
        (state) => state.minesweeper
    );

    const isBomb: boolean = bombs.includes(index);
    const adjacentBombsNum: number = countAdjacentBombs(index, bombs);
    const isRevealed: boolean = revealed.includes(index);
    const isEmpty: boolean = !isBomb && adjacentBombsNum === 0;
    const isFlagged = flags.includes(index);
    const [isQuestion, setQuestion] = useState(false);
    const [activatedBombCell, setActivatedBombCell] = useState("");

    const dispatch = useAppDispatch();

    const onFlag = (index: number): void => {
        const isFlagged = flags.includes(index);
        if (isFlagged) {
            dispatch(setFlag(flags.filter((item) => item !== index)));
        } else {
            if (!isGameOver) dispatch(setFlag([...flags, index]));
        }
    };

    const onReveal = (index: number): void => {
        const isRevealed = revealed.includes(index);
        if (!isRevealed && !isGameOver) {
            dispatch(revealCells([...revealed, index]));
        }
    };

    const revealEmptyCells = (index: number, bombs: number[]) => {
        const revealedCopy = [...revealed];
        checkCells(index, revealedCopy, bombs);
        dispatch(revealCells(revealedCopy));
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const leftClick = e.type === "click";
        const rightClick = e.type === "contextmenu";

        if (leftClick) {
            onLeftClick();
        } else if (rightClick) {
            onRightClick();
        }
    };

    const onRightClick = (): void => {
        if (isFlagged) {
            if (isQuestion) {
                onFlag(index);
                setQuestion(false);
            } else {
                setQuestion(true);
            }
        } else {
            onFlag(index);
        }
    };

    // просто сделать одну функцию?
    const onLeftClick = () => {
        clickReveal(index);
    };
    const clickReveal = (index: number): void => {
        onReveal(index);

        console.log(isBomb, isStarted, isEmpty);

        if (isBomb) {
            setActivatedBombCell("bg-red-600");
            dispatch(failGameToggle(true));
        }

        if (!isStarted) {
            const bombs = generateBombs(index); // генерим бомбы
            dispatch(setBombs(bombs));
            dispatch(startGameToggle(true));

            if (isEmpty) revealEmptyCells(index, bombs); // если первый клик на пустое место
        }
        // если пустое место не на первом клике
        if (isEmpty && isStarted) {
            revealEmptyCells(index, bombs);
        }
    };

    const makeCell = (): string => {
        if (!isStarted) {
            return isFlagged ? (isQuestion ? "❓" : "🚩") : "";
        }

        if (isBomb && isGameOver) {
            return "💣";
        }

        if (isRevealed) {
            return adjacentBombsNum === 0 ? "" : `${adjacentBombsNum}`;
        }

        if (isFlagged) {
            return isQuestion ? "❓" : "🚩";
        }

        return "";
    };
    const cell = makeCell();

    const style = isMouseDown ? "hover:bg-violet-600" : "";
    const emptyRevealed =
        isRevealed && isStarted && isEmpty ? "bg-slate-400" : "";

    return (
        <div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onContextMenu={handleClick}
            onClick={handleClick}
            className={`${style} ${activatedBombCell} ${emptyRevealed} cursor-default border border-slate-900 p-1`}
        >
            {cell}
        </div>
    );
};

export default CellComponent;
