import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Decorators } from '@shared/constants/enum';
import {
  HttpBusinessCode,
  HttpBusinessMappingCode,
  HttpReqHeader,
} from '@shared/core/httpClient/interface';
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import trim from '@shared/utils/trim';

dayjs.extend(utc);

export type SignParams = {
  request: Record<string, any>;
  clientTimestamp: number;
};

export type CompareSignParams = SignParams & {
  clientSign: string;
};

/**
 * SignGuard
 * Validates request timestamp and HMAC signature
 * Use @NoSign() decorator to skip validation for certain routes
 */
@Injectable()
export class SignGuard implements CanActivate {
  private readonly privateKey: string;

  private readonly requestGap: number;

  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    this.privateKey = this.configService.get<string>('auth.privateKey') ?? '';
    this.requestGap = this.configService.get<number>('auth.requestGap') ?? 300; // default 5 minutes
  }

  /**
   * Check if the client timestamp is within the allowed gap
   */
  private isTimestampAvailable = (clientTimestamp: number): boolean => {
    const serverUTCTimestamp = Math.floor(Date.now() / 1000);
    return (
      serverUTCTimestamp > 0 &&
      clientTimestamp > 0 &&
      serverUTCTimestamp >= clientTimestamp &&
      this.requestGap >= Math.abs(serverUTCTimestamp - clientTimestamp)
    );
  };

  /**
   * Normalize URL for signing
   */
  private formatUrl = (url: string): string => {
    const prefix = this.configService.get<string>('http.prefix') ?? '';
    return url.replace(prefix, '').replace(/\//g, '').toLowerCase();
  };

  /**
   * Generate HMAC SHA256 sign for a request
   */
  private generateSign = ({ request, clientTimestamp }: SignParams): string => {
    const { body, url = '', method = '' } = request;
    const requestBody =
      body && Object.keys(body).length > 0 ? JSON.stringify(body) : '';
    return CryptoJS.HmacSHA256(
      `${this.formatUrl(url)}>${requestBody}+${method?.toUpperCase()}|${clientTimestamp}`,
      this.privateKey,
    ).toString(CryptoJS.enc.Hex);
  };

  /**
   * Compare client sign with server-generated sign
   */
  private compareSign = ({
    clientSign,
    request,
    clientTimestamp,
  }: CompareSignParams): boolean => {
    return clientSign === this.generateSign({ request, clientTimestamp });
  };

  /**
   * Main guard logic
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const isNoSignReq = this.reflector.getAllAndOverride<boolean>(
      Decorators.noSign,
      [context.getHandler(), context.getClass()],
    );

    try {
      // Skip sign validation if disabled or decorated with @NoSign
      if (!this.configService.get('auth.enableSign') || isNoSignReq) {
        return true;
      }

      // Retrieve headers
      const clientTimestampHeader =
        request?.headers?.[HttpReqHeader?.timestamp];
      const clientSign = request?.headers?.[HttpReqHeader?.sign];

      // Validate timestamp header
      const clientTimestamp = Number(clientTimestampHeader);
      if (!clientTimestamp || isNaN(clientTimestamp)) {
        throw new BadRequestException('Invalid timestamp header');
      }

      // Validate timestamp and sign
      const isTimestampValid = this.isTimestampAvailable(clientTimestamp);
      const isSignValid = this.compareSign({
        request,
        clientTimestamp,
        clientSign,
      });

      return isTimestampValid && isSignValid;
    } catch (error) {
      switch (trim(error?.message)) {
        case HttpBusinessCode.jwtexpired:
        case HttpBusinessCode.invalidToken:
          response.data = HttpBusinessMappingCode.jwtexpired;
          break;
        default:
          break;
      }
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
