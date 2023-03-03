import React from "react";
import { useAppSelector } from "../../hooks/hooks";

const EmojiComponent = () => {
    const { isGameOver, isWin } = useAppSelector((state) => state.minesweeper);
    const face = isGameOver ? "😔" : isWin ? "😃" : "😐";
    return <div className="flex items-center justify-center  p-1">{face}</div>;
};

export default EmojiComponent;
