import { ValidatorMethod } from '@helper';

export function maxLength (length: number): ValidatorMethod {
    return function maxLength (value: any): boolean {
        return (value as string).length <= length;
    };
}
