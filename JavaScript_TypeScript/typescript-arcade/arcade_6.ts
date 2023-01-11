function solution(n: number, firstNumber: number): number {
    let slow = firstNumber;
    for (let i = 0; i < n; i++)
        if (i % 2 == 0) ++slow;
    return slow % n;
}
