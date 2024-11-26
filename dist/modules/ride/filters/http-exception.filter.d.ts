import { ExceptionFilter, HttpException, ArgumentsHost } from "@nestjs/common";
export declare class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void;
}
