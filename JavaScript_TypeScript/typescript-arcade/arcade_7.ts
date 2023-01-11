function solution(n: number): number {
    let hh = Math.floor(n / 60);
    let mm = (n % 60);
    const h = hh < 10 ? hh : Math.floor(hh / 10) + hh % 10;
    const m = mm < 10 ? mm : Math.floor(mm / 10) + mm % 10;
    return h + m;
}
