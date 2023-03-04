import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import useCellProps from "../../hooks/useCellProps";
import useHandleClicks from "../../hooks/useHandleClicks";
import { setMouse } from "../../store/minesweeperSlice";
import CellImage from "../GameAssets/CellImage";

// import closed from "../../../asset/resource/bomb.png";
// import closed from "../../asset/resource/closed.svg";

interface CellProps {
    index: number;
}

const CellComponent: React.FC<CellProps> = ({ index }) => {
    const { handleClick, bgImg, bgImgOnHover, onMouseDown, onMouseUp } =
        useHandleClicks(index);

    return (
        <div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onContextMenu={handleClick}
            onClick={handleClick}
            className={`${bgImg} ${bgImgOnHover} flex cursor-default items-center justify-center bg-cover`}
        ></div>
    );
};

export default CellComponent;
