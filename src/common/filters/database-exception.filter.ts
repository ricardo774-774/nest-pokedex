import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    
    response.status(status).json({
      statusCode: status,
      message: 'Database error, check server logs',
    });
  }
}
