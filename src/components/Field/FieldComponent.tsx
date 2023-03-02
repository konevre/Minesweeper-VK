import React, { useState } from "react";

import CellComponent from "./CellComponent";

const FieldComponent = () => {
    const [isStarted, setStart] = useState(false);
    const [bombs, setBombs] = useState<number[]>([]);

    const generateRandom = (): number => Math.floor(Math.random() * 255);
    const generateBombs = () => {
        const arr: number[] = [];
        while (arr.length < 40) {
            const num = generateRandom();
            if (!arr.includes(num)) {
                arr.push(num);
            }
        }
        return arr;
    };

    const onStart = () => {
        setStart(true);
        setBombs(generateBombs());
    };

    const cells = [...new Array(16 * 16)].map((_, index) => {
        return (
            <CellComponent
                index={index}
                key={index}
                isStarted={isStarted}
                bombs={bombs}
            />
        );
    });

    return (
        <div
            onClick={onStart}
            className="grid basis-full grid-cols-16 grid-rows-16 bg-blue-200"
        >
            {cells}
        </div>
    );
};

export default FieldComponent;
