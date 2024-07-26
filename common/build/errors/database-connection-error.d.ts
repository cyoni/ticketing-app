import { CustomError } from "./customError";
export declare class DatabaseConnectionError extends CustomError {
    reason: string;
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
