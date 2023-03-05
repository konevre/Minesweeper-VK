import React from "react";

import useHandleClicks from "../../hooks/useHandleClicks";

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
