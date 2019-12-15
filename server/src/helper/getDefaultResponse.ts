interface DefaultResponse {
    message: string;
    errors: { path: string; message: string }[];
}

export const DefaultMessages = {
    400: 'The server could not understand the request due to invalid syntax.',
    401: 'API key is missing or invalid.',
    403: 'Token does not have the required scope.',
};

export function getDefaultResponse(key: number | string, path?: string): DefaultResponse {
    return {
        message: DefaultMessages[key] || '',
        errors: [
            {
                path,
                message: DefaultMessages[key] || '',
            }
        ]
    };
}
