import React, { useState } from "react";

import CellComponent from "./CellComponent";

const FieldComponent: React.FC = () => {
    const [isMouseDown, setMouseDown] = useState(false);

    const onMouseDown = () => {
        // TODO: IF RIGHT CLICK -> NO DOWN
        setMouseDown(true);
    };
    const onMouseUp = () => {
        setMouseDown(false);
    };

    const cells = [...new Array(16 * 16)].map((_, index) => {
        return (
            <CellComponent
                index={index}
                key={index}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                isMouseDown={isMouseDown}
            />
        );
    });

    return (
        <div
            onMouseLeave={onMouseUp}
            className="grid basis-full select-none grid-cols-16 grid-rows-16 bg-blue-200"
        >
            {cells}
        </div>
    );
};

export default FieldComponent;
