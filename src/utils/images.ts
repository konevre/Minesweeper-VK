import num0 from "../assets/header/d0.svg";
import num1 from "../assets/header/d1.svg";
import num2 from "../assets/header/d2.svg";
import num3 from "../assets/header/d3.svg";
import num4 from "../assets/header/d4.svg";
import num5 from "../assets/header/d5.svg";
import num6 from "../assets/header/d6.svg";
import num7 from "../assets/header/d7.svg";
import num8 from "../assets/header/d8.svg";
import num9 from "../assets/header/d9.svg";
import dash from "../assets/header/dash.svg";
import lose from "../assets/header/face_lose.svg";
import win from "../assets/header/face_win.svg";
import pressed from "../assets/header/face_pressed.svg";
import unpressed from "../assets/header/face_unpressed.svg";
import shock from "../assets/header/face_shock.png";

import { CellImages } from "../types";

export const headerImages: string | any = {
    0: num0,
    1: num1,
    2: num2,
    3: num3,
    4: num4,
    5: num5,
    6: num6,
    7: num7,
    8: num8,
    9: num9,
    "-": dash,
    lose: lose,
    win: win,
    pressed: pressed,
    unpressed: unpressed,
    shock: shock
};

export const cellImages: CellImages = {
    opened: "bg-opened",
    closed: "bg-closed",
    flag: "bg-flag",
    mine: "bg-mine",
    mine_red: "bg-mine_red",
    mine_wrong: "bg-mine_wrong",
    question: "bg-question",
    1: "bg-1",
    2: "bg-2",
    3: "bg-3",
    4: "bg-4",
    5: "bg-5",
    6: "bg-6",
    7: "bg-7",
    8: "bg-8"
};
