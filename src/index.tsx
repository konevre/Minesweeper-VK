import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./style/index.css";
import store from "./store/index";

import App from "./App/App";

const rootEl = document.querySelector("#root");
if (!rootEl) throw new Error("Cannot find root element with that id");
const root = createRoot(rootEl);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
