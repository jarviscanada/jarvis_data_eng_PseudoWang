function solution(a: number, b: number): boolean {
    return !bothOdd(a, b) && !bothEven(a, b) || a > b || Math.abs(a - b) === 1;
}

function bothOdd(a: number, b: number): boolean {
    return (a + 1) % 2 === 0 && (b + 1) % 2 === 0;
}

function bothEven(a: number, b: number): boolean {
    return a % 2 === 0 && b % 2 === 0;
}