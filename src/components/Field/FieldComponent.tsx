import React, { useEffect, useState } from "react";
import { checkCells } from "../../utils/utils";

import CellComponent from "./CellComponent";

const FieldComponent = () => {
    const [isStarted, setStart] = useState(false);
    const [bombs, setBombs] = useState<number[]>([]);
    const [revealedCells, setReveal] = useState<number[]>([]);
    const [flagged, setFlag] = useState<number[]>([]);

    const onReveal = (index: number): void => {
        const isRevealed = revealedCells.includes(index);
        if (!isRevealed) {
            setReveal([...revealedCells, index]);
        }
    };

    const onStart = (): void => {
        setStart(true);
    };

    const onFlag = (index: number): void => {
        const isFlagged = flagged.includes(index);
        if (isFlagged) {
            setFlag(flagged.filter((item) => item !== index));
        } else {
            setFlag([...flagged, index]);
        }
    };

    const onBombs = (bombs: number[]): void => {
        setBombs(bombs);
    };

    const revealEmptyCells = (index: number, bombs: number[]) => {
        const revealedCopy = revealedCells;
        checkCells(index, revealedCopy, bombs);
        setRevealArray(revealedCopy);
    };

    const setRevealArray = (arr: number[]): void => {
        setReveal([...revealedCells].concat(arr));
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
                flagged={flagged}
                onFlag={onFlag}
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
