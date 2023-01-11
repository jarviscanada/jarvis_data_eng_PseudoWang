function solution(value1: number, weight1: number, value2: number, weight2: number, maxW: number): number {
    let finalValue = 0;
    if (weight1 <= maxW)
        finalValue = value1;
    if (weight2 <= maxW - weight1)
        finalValue += value2;
    else if (weight2 <= maxW && value2 > value1)
        finalValue = value2;
    return finalValue;
}
