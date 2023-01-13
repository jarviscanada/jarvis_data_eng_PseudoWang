function solution(a: number, b: number, c: number): boolean {
    return a + b === c ? true : a - b === c ? true : a * b === c ? true : a / b === c ? true : false;
}
