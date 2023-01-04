function solution(divisor: number, bound: number): number {
    for (let i = bound; i > 0; i--)
        if (i % divisor == 0)
            return i;
    return 0;
}
