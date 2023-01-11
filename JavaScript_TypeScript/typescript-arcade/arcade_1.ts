function solution(n: number): number {
    return n === 0 ? n : Math.floor(n % 10) + solution(Math.floor(n / 10));
}
