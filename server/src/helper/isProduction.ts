export function isProduction (): boolean {
    const { NODE_ENV } = process.env;
    return NODE_ENV && NODE_ENV.toUpperCase() === 'PRODUCTION';
}

export function isNotProduction (): boolean {
    return !isProduction();
}
