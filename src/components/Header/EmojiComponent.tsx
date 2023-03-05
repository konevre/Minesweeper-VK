import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { headerImages } from "../../utils/images";

import {
    failGameToggle,
    startGameToggle,
    revealCells,
    setBombs,
    setFlag,
    winGameToggle
} from "../../store/minesweeperSlice";

const EmojiComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isGameOver, isWin } = useAppSelector((state) => state.minesweeper);
    const { isMouseDown } = useAppSelector((state) => state.minesweeper);
    const [isFacePressed, setFace] = useState(false);

    const restartGame = (): void => {
        dispatch(setFlag([]));
        dispatch(setBombs([]));
        dispatch(revealCells([]));
        dispatch(startGameToggle(false));
        dispatch(failGameToggle(false));
        dispatch(winGameToggle(false));
    };

    const onFacePressed = (): void => {
        setFace(true);
    };
    const onFaceUnpressed = (): void => {
        setFace(false);
    };

    const showFace = () => {
        if (isFacePressed) {
            return headerImages["pressed"];
        }
        if (isMouseDown) {
            return headerImages["shock"];
        } else {
            if (isGameOver) {
                return headerImages["lose"];
            }
            if (isWin) {
                return headerImages["win"];
            }
            return headerImages["unpressed"];
        }
    };

    const face = showFace();

    return (
        <div
            onClick={restartGame}
            onMouseDown={onFacePressed}
            onMouseUp={onFaceUnpressed}
            className="flex h-10 items-center justify-center"
        >
            <img src={face} alt="face" className="h-full" />
        </div>
    );
};

export default EmojiComponent;
