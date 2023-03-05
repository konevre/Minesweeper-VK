import React from "react";

import { headerImages } from "../../utils/images";

interface NumbersProps {
    number: string;
}

const NumbersComponent: React.FC<NumbersProps> = ({ number }) => {
    return (
        <div className="flex h-10 items-center justify-center gap-x-1 bg-black p-1">
            {number.split("").map((digit: string, index: number) => (
                <img
                    key={index}
                    src={headerImages[digit]}
                    alt={digit}
                    className="h-full"
                />
            ))}
        </div>
    );
};

export default NumbersComponent;
