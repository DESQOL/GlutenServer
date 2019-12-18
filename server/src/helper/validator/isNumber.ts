export function isNumber (value: any): boolean {
    if (value === undefined || value === null) {
        return false;
    }

    if (typeof value !== 'number' && typeof value !== 'string') {
        return false;
    }

    return !isNaN(Number(value));
}

export function isNumberGreaterThanZero (value: any): boolean {
    if (!isNumber(value)) {
        return false;
    }

    const num = Number(value);
    return num > 0;
}
