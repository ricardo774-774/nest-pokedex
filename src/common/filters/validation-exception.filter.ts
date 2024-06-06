import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = exception.getResponse() as
      | string
      | { message: any; error: string };

    let message = exceptionResponse;

    if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
      message = exceptionResponse.message;
    }

    response.status(status).json({
      message,
    });
  }
}
