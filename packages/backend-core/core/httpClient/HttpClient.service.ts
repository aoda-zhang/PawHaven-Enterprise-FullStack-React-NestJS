import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { firstValueFrom, timer } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

interface RequestOptions {
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

class HttpClientInstance {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseURL: string,
    private readonly defaultHeaders: Record<string, string>,
    private readonly retryCount: number,
    private readonly retryDelay: number,
    private readonly logger: Logger,
  ) {}

  private getFullURL(path: string): string {
    const cleanedBase = this.baseURL.trim().replace(/\/+$/, '');
    const cleanedPath = path.trim().replace(/^\/+/, '');
    const fullUrl = `${cleanedBase}/${cleanedPath}`;

    if (!/^https?:\/\//.test(fullUrl)) {
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
    const headers = {
      ...this.defaultHeaders,
      ...options?.headers,
    };

    const requestConfig: AxiosRequestConfig = {
      ...options?.config,
      method,
      url,
      headers,
      data,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request<T>(requestConfig).pipe(
          retry({
            count: this.retryCount,
            delay: () => timer(this.retryDelay),
          }),
          map((res: AxiosResponse<T>) => res.data),
          catchError((error: AxiosError) => {
            this.logger.error(
              `HTTP ${method.toUpperCase()} ${url} failed`,
              error.stack || error.message,
            );

            if (error?.code === 'ECONNABORTED') {
              throw new HttpException(
                'Request timeout',
                HttpStatus.GATEWAY_TIMEOUT,
              );
            }

            if (!error?.response) {
              throw new HttpException(
                'Service unavailable',
                HttpStatus.SERVICE_UNAVAILABLE,
              );
            }

            throw new HttpException(
              error.response.data || 'Remote service error',
              error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
      );

      return response;
    } catch (error) {
      this.logger.error(
        `Final request failed: ${method.toUpperCase()} ${url}`,
        error.message,
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

@Injectable()
export default class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  create(baseURL: string) {
    if (!baseURL) {
      throw new Error('HttpClientService: baseURL is required');
    }

    const defaultHeaders = {
      'X-App-Source': 'nestjs-gateway',
      'X-Env': this.config.get<string>('NODE_ENV') || 'development',
    };

    const retryCount = this.config.get<number>('http.retryCount') || 3;
    const retryDelay = this.config.get<number>('http.retryDelay') || 1000;

    return new HttpClientInstance(
      this.httpService,
      baseURL,
      defaultHeaders,
      retryCount,
      retryDelay,
      this.logger,
    );
  }
}
