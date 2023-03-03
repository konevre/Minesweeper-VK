import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";

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
    }, [isStarted, isGameOver, isWin]);

    return <div className="flex items-center justify-center p-1">{timer}</div>;
};

export default TimerComponent;
