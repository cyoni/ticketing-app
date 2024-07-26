"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var CurrentUser = function (req, res, next) {
    if (!req.session || !req.session.jwt) {
        return next();
    }
    try {
        var currentUser = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = currentUser;
    }
    catch (e) { }
    next();
};
exports.CurrentUser = CurrentUser;
