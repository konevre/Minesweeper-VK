import { useEffect, useState } from "react";
import {
    failGameToggle,
    setBombs,
    setMouse,
    startGameToggle,
} from "../store/minesweeperSlice";

import { DigitsExcluded } from "../types";

import React from "react";

import { cellImages } from "../utils/images";

import { generateBombs } from "../utils/utils";
import { useAppDispatch, useAppSelector } from "./hooks";
import useCellProps from "./useCellProps";
import useReveal from "./useReveal";

interface useHandleClicksProps {
    handleClick: (e: React.MouseEvent<HTMLElement>) => void;
    activatedBombCell: boolean;
    bgImg: string;
    bgImgOnHover: string;
    isMouseDown: boolean;
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseUp: () => void;
    isRevealed: boolean;
}

const useHandleClicks = (index: number): useHandleClicksProps => {
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
            setActivatedBombCell(false);
        }
    }, [isStarted]);

    const onMouseDown = (e: React.MouseEvent<HTMLElement>): void => {
        const leftClick = e.button === 0;
        if (leftClick && !isRevealed) dispatch(setMouse(true));
    };
    const onMouseUp = (): void => {
        dispatch(setMouse(false));
    };

    const makeCell = (): string => {
        if (!isStarted) {
            if (isFlagged) {
                return cellImages["flag"];
            } else {
                return isQuestion
                    ? cellImages["question"]
                    : cellImages["closed"];
            }
        }

        if (isBomb && isGameOver) {
            if (activatedBombCell) {
                return cellImages["mine_red"];
            } else {
                return cellImages["mine"];
            }
        }

        if (isRevealed) {
            return adjacentBombsNum === 0
                ? cellImages["opened"]
                : cellImages[adjacentBombsNum as DigitsExcluded];
        }

        if (isFlagged) {
            if (isGameOver && !isBomb) {
                return cellImages["mine_wrong"];
            }
            return cellImages["flag"];
        } else {
            return isQuestion ? cellImages["question"] : cellImages["closed"];
        }
    };

    const bgImg: string = makeCell();
    const bgImgOnHover: string =
        isMouseDown && !isRevealed ? "hover:bg-opened" : "";

    // TODO вынести
    const startGame = (bombs: number[]): void => {
        dispatch(setBombs(bombs));
        dispatch(startGameToggle(true));
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
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
                const bombs: number[] = generateBombs(index);
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
            const bombs: number[] = generateBombs(index);
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
