export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type DigitsExcluded = Exclude<Digit, 0 | 9>;

export type CellImgProp =
    | "opened"
    | "closed"
    | "flag"
    | "mine"
    | "mine_red"
    | "mine_wrong"
    | "question";

export type CellImages = Record<DigitsExcluded | CellImgProp, string>;
