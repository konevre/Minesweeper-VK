import React from "react";

import MinesCounter from "./MinesCounter";
import EmojiComponent from "./EmojiComponent";
import TimerComponent from "./TimerComponent";

const HeaderComponent: React.FC = () => {
    return (
        <div className="bg-[#808080] p-1">
            <div className="flex justify-between bg-[#C6C6C6] p-1">
                <MinesCounter />
                <EmojiComponent />
                <TimerComponent />
            </div>
        </div>
    );
};

export default HeaderComponent;
