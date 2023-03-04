import React from "react";
import { useAppSelector } from "../../hooks/hooks";

interface CellImageProps {
    name:
        | "opened"
        | "closed"
        | "mine"
        | "mine_red"
        | "flag"
        | "question"
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7";
    // | "8";
}

const CellImage: React.FC<CellImageProps> = ({ name }) => {
    const { isMouseDown } = useAppSelector((state) => state.minesweeper);
    const onHover = isMouseDown ? "hover:bg-opened" : "";
    const bg = {
        opened: "bg-opened",
        closed: "bg-closed",
        mine: "bg-mine",
        mine_red: "bg-mine_red",
        flag: "bg-flag",
        question: "bg-question",
        "1": "bg-1",
        "2": "bg-2",
        "3": "bg-3",
        "4": "bg-4",
        "5": "bg-5",
        "6": "bg-6",
        "7": "bg-7",
        // "8": "bg-8",
    };
    const bgImg: string = bg[name];

    return (
        <div
            // src={require(`../../assets/cell/${name}.svg`)}
            // alt={name}
            className={`${bgImg} ${onHover} h-full w-full bg-cover`}
            // draggable="false"
        />
    );
};

export default CellImage;
