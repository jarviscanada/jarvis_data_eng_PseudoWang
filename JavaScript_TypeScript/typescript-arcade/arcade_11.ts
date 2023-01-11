function solution(a: number, b: number, c: number): number {
    return a === b ? c : a === c ? b : a;
}
