import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestOptions {
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
}

export class HttpClientInstance {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly serviceName: string,
    private readonly defaultHeaders: Record<string, string>,
    private readonly logger: Logger,
  ) {}

  private getCurrentMicroserviceOption(): Record<string, any> {
    const allMicroservices =
      this.configService.get<Array<Record<string, any>>>('microServices') ?? [];
    const currentMicroserviceOption = allMicroservices?.find(
      (mic) => mic?.name === this.serviceName && mic?.enable,
    );
    if (allMicroservices?.length > 0 && currentMicroserviceOption) {
      return currentMicroserviceOption?.options;
    }
    throw new Error(
      `ConfigService: missing microServices ${this.serviceName} config`,
    );
  }

  private getFullURL(path: string): string {
    const currentMicroserviceOption = this.getCurrentMicroserviceOption();
    if (!currentMicroserviceOption) {
      throw new Error(`Microservice host for "${this.serviceName}" is empty`);
    }
    let finalHost = currentMicroserviceOption?.host?.trim();
    if (
      (finalHost.includes('localhost') || finalHost.includes('127.0.0.1')) &&
      currentMicroserviceOption?.port
    ) {
      finalHost += `:${currentMicroserviceOption.port}`;
    }
    const cleanedBase = finalHost.replace(/\/+$/, '');
    const cleanedPath = path?.trim()?.replace(/^\/+/, '');
    const fullUrl = `${cleanedBase}/${cleanedPath}`;
    if (!fullUrl) {
      throw new Error(`Invalid composed URL: "${fullUrl}"`);
    }

    return fullUrl;
  }

  private async request<T>(
    method: HttpMethod,
    path: string,
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    const url = this.getFullURL(path);
    const traceId = uuidv4();
    const startTime = Date.now();
    const headers = {
      ...this.defaultHeaders,
      ...options?.headers,
      'x-trace-id': traceId,
    };

    const requestConfig: AxiosRequestConfig = {
      timeout: 8000,
      ...options?.config,
      method,
      url,
      headers,
      data,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request<T>(requestConfig).pipe(
          map((res: AxiosResponse<T>) => {
            const duration = Date.now() - startTime;
            this.logger.log(
              `HTTP ${method.toUpperCase()} ${url} completed in ${duration}ms (traceId=${traceId})`,
            );
            return res?.data;
          }),
          catchError((error: AxiosError) => {
            const duration = Date.now() - startTime;

            this.logger.error(
              `HTTP ${method.toUpperCase()} ${url} failed in ${duration}ms (traceId=${traceId})`,
              error.stack || error.message,
            );

            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let message = 'Remote service error';
            // const errorData = null;

            if (error?.code === 'ECONNABORTED') {
              status = HttpStatus.GATEWAY_TIMEOUT;
              message = 'Request timeout';
            } else if (!error?.response) {
              status = HttpStatus.SERVICE_UNAVAILABLE;
              message = 'Service unavailable';
            } else {
              status =
                error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
              message = error?.message || 'Remote service error';
              // errorData = error?.response?.data ?? null
            }

            throw new HttpException(
              {
                traceId,
                duration,
                message,
                status,
                data,
              },
              status,
            );
          }),
        ),
      );

      return response;
    } catch (error) {
      this.logger.error(
        `Final request failed: ${method.toUpperCase()} ${url}`,
        error,
      );
      throw error;
    }
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>('get', path, null, options);
  }

  post<T>(path: string, body: any, options?: RequestOptions) {
    return this.request<T>('post', path, body, options);
  }

  put<T>(path: string, body: any, options?: RequestOptions) {
    return this.request<T>('put', path, body, options);
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>('delete', path, null, options);
  }
}
