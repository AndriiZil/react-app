import { NextFunction, Response, Request } from 'express';

interface ICustomError extends Error {
    code?: number;
    message: string;
}

export function logEvent(message: string): void {
    const currentDate = new Date().toISOString();
    return console.log(`${message} [${currentDate}]`);
}

export function customError(message: string, code: number): void {
    const error: ICustomError = new Error(message);
    error.code = code;
    throw error;
}

export function error404(req: Request, res: Response, next: NextFunction) {
    const error: ICustomError = new Error('Not Found.');
    error.code = 404;

    next(error);
}

export function handleErrors(err: ICustomError, req: Request, res: Response, next: NextFunction) {
    if (err) {
        const message = err.message || 'Internal Server Error';
        const code = typeof err.code !== 'string' && err.code || 500;

        return res.status(code).json({ message });
    }

    next();
}
