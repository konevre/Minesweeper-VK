import React from "react";

const images: string | any = {
    0: require("../../assets/header/d0.svg"),
    1: require("../../assets/header/d1.svg"),
    2: require("../../assets/header/d2.svg"),
    3: require("../../assets/header/d3.svg"),
    4: require("../../assets/header/d4.svg"),
    5: require("../../assets/header/d5.svg"),
    6: require("../../assets/header/d6.svg"),
    7: require("../../assets/header/d7.svg"),
    8: require("../../assets/header/d8.svg"),
    9: require("../../assets/header/d9.svg"),
    "-": require("../../assets/header/dash.svg"),
};

interface NumbersProps {
    number: string;
}

const NumbersComponent: React.FC<NumbersProps> = ({ number }) => {
    return (
        <div className="flex h-8 items-center justify-center gap-x-1 bg-black p-1">
            {number.split("").map((digit, index) => (
                <img
                    key={index}
                    src={images[digit]}
                    alt={digit}
                    className="h-full"
                />
            ))}
        </div>
    );
};

export default NumbersComponent;
