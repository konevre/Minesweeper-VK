import React, { useState, useEffect } from "react";

import { countAdjacentBombs, generateBombs } from "../../utils/utils";

interface CellProps {
    index: number;
    isStarted: boolean;
    bombs: number[];
    revealedCells: number[];
    onReveal: (index: number) => void;
    revealEmptyCells: (index: number, bombs: number[]) => void;
    onStart: () => void;
    onBombs: (bombs: number[]) => void;
    flagged: number[];
    onFlag: (index: number) => void;
    onMouseUp: () => void;
    onMouseDown: () => void;
    isMouseDown: boolean;
    onGameOver: () => void;
    isGameOver: boolean;
}

const CellComponent = ({
    index,
    isStarted,
    bombs,
    revealedCells,
    onReveal,
    revealEmptyCells,
    onStart,
    onBombs,
    flagged,
    onFlag,
    onMouseDown,
    onMouseUp,
    isMouseDown,
    onGameOver,
    isGameOver,
}: CellProps) => {
    const isBomb: boolean = bombs.includes(index);
    const adjacentBombsNum: number = countAdjacentBombs(index, bombs);
    const isRevealed: boolean = revealedCells.includes(index);
    const isEmpty: boolean = !isBomb && adjacentBombsNum === 0;
    const isFlagged = flagged.includes(index);
    const [isQuestion, setQuestion] = useState(false);
    const [activatedBombCell, setActivatedBombCell] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const leftClick = e.type === "click";
        const rightClick = e.type === "contextmenu";

        if (leftClick) {
            console.log("Left click");
            onLeftClick();
        } else if (rightClick) {
            console.log("Right click");
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

        if (isBomb) {
            setActivatedBombCell("bg-red-600");
            onGameOver();
        }

        if (!isStarted) {
            const bombs = generateBombs(index); // генерим бомбы
            onBombs(bombs); // кладем бомбы в стейт
            onStart(); // меняем на true
            if (isEmpty) revealEmptyCells(index, bombs); // если первый клик на пустое место
        }
        // если пустое место не на первом клике
        if (isEmpty && isStarted) {
            revealEmptyCells(index, bombs);
        }
    };

    const makeCell = (): string => {
        if (isStarted) {
            if (isBomb && isGameOver) {
                // TODO: check if GAME IS OVER
                return "💣";
            } else {
                if (isRevealed) {
                    if (adjacentBombsNum === 0) {
                        return "";
                    } else {
                        return `${adjacentBombsNum}`;
                    }
                } else {
                    if (isFlagged) {
                        if (isQuestion) {
                            return "❓";
                        } else {
                            return "🚩";
                        }
                    } else {
                        return "";
                    }
                }
            }
        } else {
            if (isFlagged) {
                if (isQuestion) {
                    return "❓";
                } else {
                    return "🚩";
                }
            } else {
                return "";
            }
        }
    };
    const cell = makeCell();

    const style = isMouseDown ? "hover:bg-violet-600" : "";

    return (
        <div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onContextMenu={handleClick}
            onClick={handleClick}
            className={`${style} ${activatedBombCell} cursor-default border border-slate-900 p-1`}
        >
            {cell}
        </div>
    );
};

export default CellComponent;
