export declare type Classes = string | {
    [K: string]: boolean;
} | null | undefined | Classes[];
export declare function mergeClasses(existingClasses?: Classes, newClasses?: Classes): Classes;
