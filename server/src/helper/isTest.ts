export function isTest (): boolean {
    const { NODE_ENV } = process.env;
    return NODE_ENV && NODE_ENV.toUpperCase() === 'TEST';
}
