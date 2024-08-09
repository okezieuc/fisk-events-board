export function nullthrows<T>(value: T | null | undefined, errorMessage: string = 'Value is null or undefined'): T {
    if (value == null) {
      throw new Error(errorMessage);
    }
    return value;
};