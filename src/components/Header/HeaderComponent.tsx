import React from "react";

import MinesCounter from "./MinesCounter";
import EmojiComponent from "./EmojiComponent";
import TimerComponent from "./TimerComponent";

const HeaderComponent = () => {
    return (
        <div className="flex h-8 justify-between bg-red-200">
            <MinesCounter />
            <EmojiComponent />
            <TimerComponent />
        </div>
    );
};

export default HeaderComponent;
