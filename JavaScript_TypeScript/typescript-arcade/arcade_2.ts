function solution(n: number): number {
    let result: number = 0;
    for (let i = 1; i <= n; i++)
        result += 9 * (Math.pow(10, i-1));
    return result;
}
