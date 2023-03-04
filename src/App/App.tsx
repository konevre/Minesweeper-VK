import React from "react";

import FieldComponent from "../components/Field/FieldComponent";
import HeaderComponent from "../components/Header/HeaderComponent";

const App = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col gap-y-3 bg-[#C6C6C6] p-3">
                <HeaderComponent />
                <FieldComponent />
            </div>
        </div>
    );
};

export default App;
