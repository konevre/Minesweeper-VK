import { useEffect, useState } from "react";
import {
    failGameToggle,
    setBombs,
    setMouse,
    startGameToggle,
} from "../store/minesweeperSlice";

import React from "react";

import { generateBombs } from "../utils/utils";
import { useAppDispatch, useAppSelector } from "./hooks";
import useCellProps from "./useCellProps";
import useReveal from "./useReveal";

const useHandleClicks = (index: number) => {
    const dispatch = useAppDispatch();
    const { isStarted, bombs, isGameOver, isMouseDown } = useAppSelector(
        (state) => state.minesweeper
    );
    const [activatedBombCell, setActivatedBombCell] = useState(false);
    const [isQuestion, setQuestion] = useState(false);
    const { onFlag, onReveal, revealEmptyCells } = useReveal();
    const { isFlagged, isBomb, isEmpty, isRevealed, adjacentBombsNum } =
        useCellProps(index);

    useEffect(() => {
        if (!isStarted) {
            setQuestion(false);
        }
    }, [isStarted]);

    // TODO RIGHT CLICK BUT NOT CONTEXT
    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        const leftClick = e.button === 0;
        if (leftClick) dispatch(setMouse(true));
    };
    const onMouseUp = () => {
        dispatch(setMouse(false));
    };

    const makeCell = () => {
        if (!isStarted) {
            if (isFlagged) {
                return "flag";
            } else {
                return isQuestion ? "question" : "closed";
            }
        }

        if (isBomb && isGameOver) {
            if (activatedBombCell) {
                return "mine_red";
            } else {
                return "mine";
            }
        }

        if (isRevealed) {
            return adjacentBombsNum === 0 ? "opened" : `${adjacentBombsNum}`;
        }

        if (isFlagged) {
            if (isGameOver && !isBomb) {
                return "mine_wrong";
            }
            return "flag";
        } else {
            return isQuestion ? "question" : "closed";
        }
    };

    const bgImg = `bg-${makeCell()}`;
    const bgImgOnHover = isMouseDown && !isRevealed ? "hover:bg-opened" : "";

    // TODO вынести
    const startGame = (bombs: number[]) => {
        dispatch(setBombs(bombs));
        dispatch(startGameToggle(true));
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const leftClick = e.type === "click";
        const rightClick = e.type === "contextmenu";

        if (leftClick) {
            onLeftClick(index);
        } else if (rightClick && !isRevealed) {
            onRightClick(index);
        }
    };

    const onRightClick = (index: number): void => {
        if (isFlagged) {
            onFlag(index);
            setQuestion(true);
        } else {
            if (!isStarted) {
                const bombs = generateBombs(index);
                startGame(bombs);
            }
            isQuestion ? setQuestion(false) : onFlag(index);
        }
    };

    const onLeftClick = (index: number): void => {
        onReveal(index);
        if (isFlagged) {
            onFlag(index);
        }

        if (isBomb) {
            setActivatedBombCell(true);
            dispatch(failGameToggle(true));
        }

        if (!isStarted) {
            const bombs = generateBombs(index);
            startGame(bombs);

            if (isEmpty) revealEmptyCells(index, bombs);
        }

        if (isEmpty && isStarted) {
            revealEmptyCells(index, bombs);
        }
    };

    return {
        handleClick,
        activatedBombCell,
        bgImg,
        bgImgOnHover,
        isMouseDown,
        onMouseDown,
        onMouseUp,
        isRevealed,
    };
};

export default useHandleClicks;
