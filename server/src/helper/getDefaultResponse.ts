const messages = {
    401: 'API key is missing or invalid.',
    403: 'Token does not have the required scope.',
};

interface DefaultResponse {
    message: string;
    errors: { path: string; message: string }[];
}

export function getDefaultResponse(key: number | string, path?: string): DefaultResponse {
    return {
        message: messages[key] || '',
        errors: [
            {
                path,
                message: messages[key] || '',
            }
        ]
    };
}
