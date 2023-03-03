export const generateRandom = (): number => Math.floor(Math.random() * 255);

export const generateBombs = (index: number): number[] => {
    const arr: number[] = [];
    while (arr.length < 40) {
        const num = generateRandom();
        if (!arr.includes(num) && num !== index) {
            console.log(num === index);
            arr.push(num);
        }
    }
    return arr;
};

export const countAdjacentBombs = (index: number, bombs: number[]): number => {
    let counter: number = 0;
    const mainCol: number = index % 16;
    const adjacentCells: number[][] = [
        [index - 17, index - 16, index - 15],
        [index - 1, index + 1],
        [index + 15, index + 16, index + 17],
    ];

    adjacentCells.forEach((item) => {
        item.forEach((num) => {
            const adjCol: number = num % 16;
            const isInRange = num >= 0 && num <= 255;
            const isAdjacent =
                Math.abs(adjCol - mainCol) === 1 ||
                Math.abs(adjCol - mainCol) === 0;
            const isBomb = bombs.includes(num);

            if (isInRange && isAdjacent && isBomb) counter++;
        });
    });
    return counter;
};
