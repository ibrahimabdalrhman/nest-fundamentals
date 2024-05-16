import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response, Request } from 'express'; // Import Response from express

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();

        //prepare err 
        const exceptionResponse = exception.getResponse();
        const err =
            typeof response === 'string'
                ? { message: exceptionResponse }
                : (exceptionResponse as Object)

        response.status(status).json({
            ...err,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        })

    }
}
