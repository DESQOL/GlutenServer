import { ValidatorMethod } from '@helper';

export function minLength (length: number): ValidatorMethod {
    return function minLength (value: any): boolean {
        return (value as string).length >= length;
    };
}
