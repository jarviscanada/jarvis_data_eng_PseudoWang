declare module 'stats' {
    // input: t1 and t2, output: number
    type Comparator<T> = (a: T, b: T) => number;

    // input: t[] and comparator; output: number
    type GetIndex = <T>(input: T[], comparator: Comparator<T>) => number;
    export const getMaxIndex: GetIndex;
    export const getMinIndex: GetIndex;
    export const getMedianIndex: GetIndex;

    // input: t[] and comparator, output: t or null
    type GetElement = <T>(input: T[], comparator: Comparator<T>) => T | null;
    export const getMaxElement: GetElement;
    export const getMinElement: GetElement;
    export const getMedianElement: GetElement;

    // input: t[] and callback number, output: number or null
    export const getAverageValue: <T>(input: T[], getValue: (item: T) => number) => number | null;
}
