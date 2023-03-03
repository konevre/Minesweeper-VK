import React, { useEffect, useState } from "react";
import { generateBombs, countAdjacentBombs } from "../../utils/utils";

import CellComponent from "./CellComponent";

const FieldComponent = () => {
    const [isStarted, setStart] = useState(false);
    const [bombs, setBombs] = useState<number[]>([]);
    const [revealedCells, setReveal] = useState<number[]>([]);

    const onReveal = (index: number): void => {
        const isRevealed = revealedCells.includes(index);
        if (!isRevealed) {
            setReveal([...revealedCells, index]);
        }
    };

    const onStart = () => {
        setStart(true);
    };

    const onBombs = (bombs: number[]) => {
        setBombs(bombs);
    };

    const revealEmptyCells = (index: number, bombs: number[]) => {
        const revealedCopy = revealedCells;
        checkCells(index, revealedCopy, bombs);
        setRevealArray(revealedCopy);
    };

    const setRevealArray = (arr: number[]) => {
        setReveal([...revealedCells].concat(arr));
    };

    const checkCells = (
        index: number,
        revealedArr: number[],
        bombs: number[]
    ) => {
        if (bombs.includes(index) || revealedCells.includes(index)) return;

        revealedArr.push(index);

        if (countAdjacentBombs(index, bombs) > 0) return;

        const mainCol: number = index % 16;
        const adjacentCells = [
            [index - 17, index - 16, index - 15],
            [index - 1, index + 1],
            [index + 15, index + 16, index + 17],
        ];

        adjacentCells.forEach((item) => {
            item.forEach((num) => {
                const adjCol: number = num % 16;
                const isInRange = num >= 0 && num <= 255;
                const isAdjacent =
                    Math.abs(adjCol - mainCol) === 1 ||
                    Math.abs(adjCol - mainCol) === 0;
                const isBomb = bombs.includes(num);

                if (isInRange && isAdjacent && !isBomb) {
                    checkCells(num, revealedArr, bombs);
                }
            });
        });
    };

    const cells = [...new Array(16 * 16)].map((_, index) => {
        return (
            <CellComponent
                index={index}
                key={index}
                isStarted={isStarted}
                bombs={bombs}
                revealedCells={revealedCells}
                onReveal={onReveal}
                revealEmptyCells={revealEmptyCells}
                onStart={onStart}
                onBombs={onBombs}
            />
        );
    });

    return (
        <div className="grid basis-full grid-cols-16 grid-rows-16 bg-blue-200">
            {cells}
        </div>
    );
};

export default FieldComponent;
