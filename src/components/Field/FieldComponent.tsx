import React from "react";

const FieldComponent = () => {
    const cells = [...new Array(16 * 16)].map((_, i) => {
        return <div className="border border-slate-900 p-1"></div>;
    });

    return (
        <div className="grid basis-full grid-cols-16 grid-rows-16 bg-blue-200">
            {cells}
        </div>
    );
};

export default FieldComponent;
