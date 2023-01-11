function solution(young: boolean, beautiful: boolean, loved: boolean): boolean {
    return (young && beautiful && !loved) || (loved && (!young || !beautiful));
}
