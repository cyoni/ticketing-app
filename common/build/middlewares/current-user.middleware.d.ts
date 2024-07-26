import { NextFunction, Request, Response } from "express";
interface ICurrentUser {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: ICurrentUser;
        }
    }
}
export declare const CurrentUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
