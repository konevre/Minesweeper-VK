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
}: CellProps) => {
    const isBomb = bombs.includes(index);
    const adjacentBombsNum = countAdjacentBombs(index, bombs);
    const isRevealed = revealedCells.includes(index);

    const isEmpty = !isBomb && adjacentBombsNum === 0;

    const clickReveal = (index: number) => {
        onReveal(index);

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

    const cell: string = isBomb
        ? "💣"
        : adjacentBombsNum === 0
        ? "-"
        : `${adjacentBombsNum}`;

    return (
        <div
            onClick={() => clickReveal(index)}
            className="border border-slate-900 p-1"
        >
            {isStarted && isRevealed && cell}
        </div>
    );
};

export default CellComponent;
