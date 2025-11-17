import {
  ArgumentsHost,
  Catch,
  RpcExceptionFilter,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export default class AllRpcExceptionsFilter implements RpcExceptionFilter {
  private readonly logger = new Logger(AllRpcExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    let message = 'Internal microservice error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let data = null;

    if (exception instanceof RpcException) {
      const error = exception.getError();
      if (typeof error === 'string') {
        message = error;
      } else if (typeof error === 'object' && error !== null) {
        message = (error as { message?: string }).message || message;
        status = (error as { status?: number }).status || status;
        data = (error as { data?: any }).data || null;
      }
    } else if (exception instanceof Error) {
      message = exception.message || message;
    }

    const errorResponse = {
      message,
      status,
      data,
    };
    this.logger.error(
      '🚨 RPC Exception',
      JSON.stringify(errorResponse),
      exception?.stack,
    );
    return throwError(() => new RpcException(errorResponse));
  }
}
