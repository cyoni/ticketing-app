"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
var customError_1 = require("./customError");
var DatabaseConnectionError = /** @class */ (function (_super) {
    __extends(DatabaseConnectionError, _super);
    function DatabaseConnectionError() {
        var _this = _super.call(this, "error connection to database") || this;
        _this.reason = "error connection to database";
        _this.statusCode = 400;
        Object.setPrototypeOf(_this, DatabaseConnectionError.prototype);
        return _this;
    }
    DatabaseConnectionError.prototype.serializeErrors = function () {
        return [{ message: this.reason }];
    };
    return DatabaseConnectionError;
}(customError_1.CustomError));
exports.DatabaseConnectionError = DatabaseConnectionError;
