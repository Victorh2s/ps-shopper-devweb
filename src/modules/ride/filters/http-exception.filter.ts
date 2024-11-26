import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let errorCode = "INVALID_DATA";
    let errorDescription: string;

    if (typeof exceptionResponse === "string") {
      errorDescription = exceptionResponse;
    } else if (typeof exceptionResponse === "object") {
      const responseObj = exceptionResponse as Record<string, any>;

      errorCode = responseObj["error_code"] || errorCode;

      if (Array.isArray(responseObj["message"])) {
        errorDescription = responseObj["message"].join(", ");
      } else {
        errorDescription = responseObj["message"] || "Erro inesperado";
      }
    } else {
      errorDescription = "Erro inesperado";
    }

    const errorResponse = {
      error_code: errorCode,
      error_description: errorDescription,
    };

    response.status(status).json(errorResponse);
  }
}
