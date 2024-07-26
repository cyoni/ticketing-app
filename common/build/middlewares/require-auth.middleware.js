"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireAuth = void 0;
var common_1 = require("common");
var RequireAuth = function (req, res, next) {
    console.log("req.currentUser", req.currentUser);
    if (!req.currentUser) {
        return next(new common_1.NotAuthorizedError());
    }
    next();
};
exports.RequireAuth = RequireAuth;
