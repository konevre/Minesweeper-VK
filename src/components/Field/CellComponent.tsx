import React from "react";

interface CellProps {
    index: number;
    isStarted: boolean;
    bombs: number[];
}

const CellComponent = ({ index, isStarted, bombs }: CellProps) => {
    const cellObj = {
        row: Math.floor(index / 16),
        col: index % 16,
        isBomb: bombs.includes(index),
    };

    const cell: string = cellObj.isBomb ? "💣" : "";

    return (
        <div className="border border-slate-900 p-1">{isStarted && cell}</div>
    );
};

export default CellComponent;
