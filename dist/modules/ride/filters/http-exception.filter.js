"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let CustomHttpExceptionFilter = class CustomHttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        let errorCode = "INVALID_DATA";
        let errorDescription;
        if (typeof exceptionResponse === "string") {
            errorDescription = exceptionResponse;
        }
        else if (typeof exceptionResponse === "object") {
            const responseObj = exceptionResponse;
            errorCode = responseObj["error_code"] || errorCode;
            if (Array.isArray(responseObj["message"])) {
                errorDescription = responseObj["message"].join(", ");
            }
            else {
                errorDescription = responseObj["message"] || "Erro inesperado";
            }
        }
        else {
            errorDescription = "Erro inesperado";
        }
        const errorResponse = {
            error_code: errorCode,
            error_description: errorDescription,
        };
        response.status(status).json(errorResponse);
    }
};
exports.CustomHttpExceptionFilter = CustomHttpExceptionFilter;
exports.CustomHttpExceptionFilter = CustomHttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], CustomHttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map