import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';

import { HttpResType } from './interface';

@Injectable()
@Catch()
export default class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const isRpcContext = host.getType() === 'rpc';
    const isHttpContext = host.getType() === 'http';

    let message = 'Service error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let data = null;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any)?.message || exception.message;
      status =
        typeof res === 'object' && 'status' in res
          ? (res as any).status || exception.getStatus()
          : exception.getStatus();

      data = typeof res === 'object' ? (res as any).data || null : null;
    } else {
      message = exception?.message ?? message;
      status = exception?.status ?? status;
      data = exception?.data ?? null;
    }

    const errorResponse: HttpResType = {
      status,
      isSuccess: false,
      message,
      data,
    };

    this.logger.error(
      `Exception caught (context: ${host.getType()}):`,
      JSON.stringify(errorResponse),
    );
    if (isHttpContext) {
      const response = host.switchToHttp().getResponse();
      response.status(status).json(errorResponse);
    }
    if (isRpcContext) {
      return errorResponse;
    }
  }
}
