import React from "react";

import FieldComponent from "../components/Field/FieldComponent";
import HeaderComponent from "../components/Header/HeaderComponent";

const App = () => {
    return (
        <div className="flex h-full items-center justify-center drop-shadow-2xl">
            <div className="border-2 border-[#C6C6C6] bg-[#F5F5F5] p-1  ">
                <div className="flex flex-col gap-y-3 bg-[#C6C6C6] p-3">
                    <HeaderComponent />
                    <FieldComponent />
                </div>
            </div>
        </div>
    );
};

export default App;
