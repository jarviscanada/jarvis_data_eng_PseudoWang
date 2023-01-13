declare module 'str-utils' {
    /*
    export function strReverse(val:string): string;
    export function strToLower(val:string): string;
    export function strToUpper(val:string): string;
    export function strRandomize(val:string): string;
    export function strInvertCase(val:string): string;
    */

    // better way, do not repeat
    type StrUtil = (input: string) => string;

    export const strReverse: StrUtil;
    export const strToLower: StrUtil;
    export const strToUpper: StrUtil;
    export const strRandomize: StrUtil;
    export const strInvertCase: StrUtil;
}