"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var customError_1 = require("../errors/customError");
var errorHandler = function (err, req, res, next) {
    if (err instanceof customError_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.log("something went wrong", err);
    res.status(500).send({ message: err.message });
};
exports.errorHandler = errorHandler;
