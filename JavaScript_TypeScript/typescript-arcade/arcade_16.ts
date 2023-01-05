function solution(lastNumberOfDays: number): number[] {
    if (lastNumberOfDays === 28)
        return [31];
    else if (lastNumberOfDays === 30)
        return [31];
    else
        return [28, 30, 31];
}
