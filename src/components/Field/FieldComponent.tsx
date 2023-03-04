import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setMouse, winGameToggle } from "../../store/minesweeperSlice";

import CellComponent from "./CellComponent";

const FieldComponent: React.FC = () => {
    const cells = [...new Array(16 * 16)].map((_, index) => {
        return <CellComponent index={index} key={index} />;
    });

    const dispatch = useAppDispatch();
    const { isGameOver, isWin, flags, bombs, isStarted, revealed } =
        useAppSelector((state) => state.minesweeper);

    const isFieldDisabled = isGameOver || isWin ? "pointer-events-none" : "";

    const checkIfWin = () => {
        const sortedFlags = [...flags].sort();
        const sortedBombs = [...bombs].sort();
        const result = sortedFlags.every(
            (element, index) => element === sortedBombs[index]
        );
        return result;
    };

    const total = bombs.length - flags.length;

    useEffect(() => {
        if (total === 0 && isStarted) {
            const isAllOpen = revealed.length + flags.length === 16 * 16;
            if (checkIfWin() && isAllOpen) {
                // console.log(revealed.length);
                dispatch(winGameToggle(true));
            }
        }
        checkIfWin();
    }, [total, revealed]);

    // TODO - вынести в отдельный, как и в useHandleClicks
    const onMouseUp = () => {
        dispatch(setMouse(false));
    };

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
