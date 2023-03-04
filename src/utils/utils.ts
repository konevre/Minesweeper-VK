export const generateRandom = (): number => Math.floor(Math.random() * 255);

export const generateBombs = (index: number): number[] => {
    const arr: number[] = [];
    while (arr.length < 2) {
        const num = generateRandom();
        if (!arr.includes(num) && num !== index) {
            console.log(num === index);
            arr.push(num);
        }
    }
    return arr;
};

export const getAdjacentCells = (index: number): number[][] => {
    return [
        [index - 17, index - 16, index - 15],
        [index - 1, index + 1],
        [index + 15, index + 16, index + 17],
    ];
};

export const getCellProps = (mainCol: number, num: number, bombs: number[]) => {
    const adjCol: number = num % 16;
    return {
        isInRange: num >= 0 && num <= 255,
        isAdjacent:
            Math.abs(adjCol - mainCol) === 1 ||
            Math.abs(adjCol - mainCol) === 0,
        isBomb: bombs.includes(num),
    };
};

export const countAdjacentBombs = (index: number, bombs: number[]): number => {
    let counter: number = 0;
    const mainCol: number = index % 16;
    const adjacentCells: number[][] = getAdjacentCells(index);

    adjacentCells.forEach((item) => {
        item.forEach((num) => {
            const { isInRange, isAdjacent, isBomb } = getCellProps(
                mainCol,
                num,
                bombs
            );

            if (isInRange && isAdjacent && isBomb) counter++;
        });
    });
    return counter;
};

export const checkCells = (
    index: number,
    revealedArr: number[],
    bombs: number[]
) => {
    if (bombs.includes(index) || revealedArr.includes(index)) return;
    revealedArr.push(index);
    if (countAdjacentBombs(index, bombs) > 0) return;

    const mainCol: number = index % 16;
    const adjacentCells = getAdjacentCells(index);

    adjacentCells.forEach((item) => {
        item.forEach((num) => {
            const { isInRange, isAdjacent, isBomb } = getCellProps(
                mainCol,
                num,
                bombs
            );
            if (isInRange && isAdjacent && !isBomb) {
                checkCells(num, revealedArr, bombs);
            }
        });
    });
};
