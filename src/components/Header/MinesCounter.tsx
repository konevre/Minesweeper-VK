import React from "react";

import { useAppSelector } from "../../hooks/hooks";

import NumbersComponent from "./NumbersComponent";

const MinesCounter: React.FC = () => {
    const { flags, bombs, isStarted } = useAppSelector(
        (state) => state.minesweeper
    );
    const total: number = bombs.length - flags.length;

    const counter: string = !isStarted
        ? "040"
        : total.toString().padStart(3, "0");
    return <NumbersComponent number={counter} />;
};

export default MinesCounter;
