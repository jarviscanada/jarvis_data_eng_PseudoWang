function solution(a: number[]): number {
    let r: string = "";
    for (let i = a.length - 1; i >= 0; i--) {
        let b = a[i].toString(2);
        if (b.length < 8) {
            let l = 8 - b.length;
            for (let j = 0; j < l; j++)
                b = '0' + b;
        }
        r += b;
    }
    //console.log(r)
    return parseInt(r, 2);
}
