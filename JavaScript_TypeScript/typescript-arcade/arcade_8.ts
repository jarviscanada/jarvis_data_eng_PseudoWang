function solution(min1: number, min2_10: number, min11: number, s: number): number {
    if (s < min1)
        return 0;
    else if (s <= min1 + min2_10 * 9)
        return 1 + Math.floor((s - min1) / min2_10);
    else
        return 10 + Math.floor((s - min1 - min2_10 * 9) / min11);
}