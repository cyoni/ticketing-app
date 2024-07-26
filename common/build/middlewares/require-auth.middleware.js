"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireAuth = void 0;
var not_authorized_error_1 = require("../errors/not-authorized-error");
var RequireAuth = function (req, res, next) {
    console.log("req.currentUser", req.currentUser);
    if (!req.currentUser) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    next();
};
exports.RequireAuth = RequireAuth;
