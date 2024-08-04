import { CustomError } from "./customError";
export declare class NotAuthorizedError extends CustomError {
    message: string;
    reason: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
