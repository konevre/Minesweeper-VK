import React from "react";

import FieldComponent from "../components/Field/FieldComponent";
import HeaderComponent from "../components/Header/HeaderComponent";

const App = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-3/4 w-1/3 flex-col bg-slate-300">
                <HeaderComponent />
                <FieldComponent />
            </div>
        </div>
    );
};

export default App;
