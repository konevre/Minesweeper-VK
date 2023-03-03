import React from "react";
import { useAppSelector } from "../../hooks/hooks";

const MinesCounter = () => {
    const { flags, bombs } = useAppSelector((state) => state.minesweeper);
    const total = bombs.length - flags.length;

    return <div className="flex items-center justify-center  p-1">{total}</div>;
};

export default MinesCounter;
