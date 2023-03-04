import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import NumbersComponent from "./NumbersComponent";

const TimerComponent: React.FC = () => {
    const [timer, setTimer] = useState(0);
    const { isGameOver, isStarted, isWin } = useAppSelector(
        (state) => state.minesweeper
    );

    useEffect(() => {
        if (isStarted && !isGameOver && !isWin) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
        if (!isStarted) {
            setTimer(0);
        }
    }, [isStarted, isGameOver, isWin]);

    const counter = timer >= 999 ? "999" : timer.toString().padStart(3, "0");
    return <NumbersComponent number={counter} />;
};

export default TimerComponent;
