function solution(score1: number, score2: number): boolean {
    return score1 === 7 && score2 < 7 && score2 > 4 ||
           score2 === 7 && score1 < 7 && score1 > 4 ||
           (score1 === 6 || score2 === 6) && score1 < 7 && score2 < 7 && Math.abs(score1 - score2) > 1;
}
