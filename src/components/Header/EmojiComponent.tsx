import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import lose from "../../assets/header/face_lose.svg";
import win from "../../assets/header/face_win.svg";
import pressed from "../../assets/header/face_pressed.svg";
import unpressed from "../../assets/header/face_unpressed.svg";
import shock from "../../assets/header/face_shock.png";
import {
    failGameToggle,
    startGameToggle,
    revealCells,
    setBombs,
    setFlag,
    winGameToggle,
} from "../../store/minesweeperSlice";

const EmojiComponent = () => {
    const { isGameOver, isWin } = useAppSelector((state) => state.minesweeper);
    const [isFacePressed, setFace] = useState(false);
    const { isMouseDown } = useAppSelector((state) => state.minesweeper);

    const dispatch = useAppDispatch();

    const restartGame = () => {
        dispatch(setFlag([]));
        dispatch(setBombs([]));
        dispatch(revealCells([]));
        dispatch(startGameToggle(false));
        dispatch(failGameToggle(false));
        dispatch(winGameToggle(false));
    };

    const onFacePressed = () => {
        setFace(true);
    };
    const onFaceUnpressed = () => {
        setFace(false);
    };

    const showFace = () => {
        if (isFacePressed) {
            return pressed;
        }
        if (isMouseDown) {
            return shock;
        } else {
            if (isGameOver) {
                return lose;
            }
            if (isWin) {
                return win;
            }
            return unpressed;
        }
    };
    const face = showFace();

    return (
        <div
            onClick={restartGame}
            onMouseDown={onFacePressed}
            onMouseUp={onFaceUnpressed}
            className="flex h-8 items-center justify-center"
        >
            <img src={face} alt="face" className="h-full" />
        </div>
    );
};

export default EmojiComponent;
