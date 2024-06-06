import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (message === 'Internal server error') {
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (typeof(message) === "object") {
      response.status(status).json({
        ...message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } 
  }   
}



// {
//   "statusCode": 500,
//   "message": "Internal server error",
//   "timestamp": "2024-06-06T17:24:37.176Z",
//   "path": "/api/pokemon"
// }