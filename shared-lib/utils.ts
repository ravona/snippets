// @ts-nocheck
import { nanoid } from "nanoid";

// Type Guards
/**
 * Type guard to check if a value is a non-null object
 */
function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null;
}

/**
 * Type guard to check if a value is an array
 */
export const isArray = <T>(value: unknown): value is T[] => {
    return Array.isArray(value);
};

/**
 * Checks if the value is an empty array
 * Returns true for empty arrays and false for:
 * - non-empty arrays
 * - null
 * - undefined
 * - non-array values
 */
export const isEmptyArray = <T>(value: unknown): value is T[] => {
    return isArray<T>(value) && value.length === 0;
};

/**
 * Checks if the value is an empty object (no own enumerable string keyed properties)
 * Returns true for empty objects and false for:
 * - non-empty objects
 * - null
 * - undefined
 * - arrays (use isEmptyArray instead)
 * - primitives
 */
export const isEmptyObject = (value: unknown): value is Record<string, never> => {
    if (!isObject(value)) {
        return false;
    }

    if (isArray(value)) {
        return false;
    }

    return Object.keys(value).length === 0;
};

// Object Manipulation
/**
 * Adds an "id" property with a unique value to any object
 */
export type WithId<T> = T & { id: string };

/**
 * Returns a new object with all properties of the input plus a unique id
 */
export function withUniqueId<T extends object>(obj: T): WithId<T> {
    if (!isObject(obj)) {
        throw new Error("Input must be a valid object");
    }

    return {
        ...obj,
        id: nanoid(),
    };
}
