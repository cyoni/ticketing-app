import { ValidationError } from "express-validator";
import { CustomError } from "./customError";
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    path: string;
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors(): {
        message: string;
    }[];
}
