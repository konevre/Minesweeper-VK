import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setMouse, winGameToggle } from "../../store/minesweeperSlice";

import CellComponent from "./CellComponent";

const FieldComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isGameOver, isWin, flags, bombs, isStarted, revealed } =
        useAppSelector((state) => state.minesweeper);

    const total: number = bombs.length - flags.length;
    const isFieldDisabled: string =
        isGameOver || isWin ? "pointer-events-none" : "";

    useEffect(() => {
        if (total === 0 && isStarted) {
            const isAllOpen = revealed.length + flags.length === 16 * 16;
            if (checkIfWin() && isAllOpen) {
                dispatch(winGameToggle(true));
            }
        }
    }, [total, revealed]);

    const checkIfWin = (): boolean => {
        const sortedFlags: number[] = [...flags].sort();
        const sortedBombs: number[] = [...bombs].sort();
        const result: boolean = sortedFlags.every(
            (element, index) => element === sortedBombs[index]
        );
        return result;
    };

    const onMouseUp = (): void => {
        dispatch(setMouse(false));
    };

    const cells: JSX.Element[] = [...new Array(16 * 16)].map((_, index) => {
        return <CellComponent index={index} key={index} />;
    });

    return (
        <div
            onMouseLeave={onMouseUp}
            className={`${isFieldDisabled} grid basis-full select-none grid-cols-16 grid-rows-16 bg-[#808080] p-1`}
        >
            {cells}
        </div>
    );
};

export default FieldComponent;
