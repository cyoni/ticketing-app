import { CustomError } from "./customError";
export declare class NotAuthorizedError extends CustomError {
    reason: string;
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
