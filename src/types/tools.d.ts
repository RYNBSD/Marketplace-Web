import type { RegularObject } from "./definitions";

export type ArrayValues<T extends Array> = T[number];

export type DeepArrayValues<T extends Array> = T[number] extends Array
    ? DeepArrayValues<T[number]>
    : T[number];

export type ObjectKeys<T extends RegularObject> = keyof T;
export type ObjectValues<T extends RegularObject> = T[keyof T];

export type DeepObjectKeys<T extends RegularObject> =
    T[keyof T] extends RegularObject
        ? keyof T | DeepObjectKeys<T[keyof T]>
        : keyof T;
export type DeepObjectValues<T extends RegularObject> =
    T[keyof T] extends RegularObject
        ? DeepObjectValues<T[keyof T]>
        : T[keyof T];
