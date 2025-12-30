import crypto from 'node:crypto';

import { BadGatewayException, Injectable } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import {
  createProxyMiddleware,
  fixRequestBody,
  RequestHandler,
} from 'http-proxy-middleware';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProxyService {
  constructor(private readonly configService: ConfigService) {}

  getProxyClient(): RequestHandler<Request, Response, NextFunction> {
    try {
      return createProxyMiddleware({
        router: this.resolveTarget.bind(this),
        pathRewrite: this.rewritePath.bind(this),
        ignorePath: false,
        changeOrigin: true,
        logger: console,
        on: {
          proxyReq: this.handleProxyReq.bind(this),
          proxyRes: this.handleProxyRes.bind(this),
        },
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  private resolveTarget(req: Request): string {
    return this.getCurrentMSOption(req)?.host ?? '';
  }

  private getCurrentMSOption(req: Request) {
    const servicePrefix = this.extractServicePrefix(req);
    const allMicroServices = this.configService.get('microServices') ?? [];
    const currentMicroServices = allMicroServices?.find(
      (mic: any) =>
        mic?.options?.gatewayPrefix === servicePrefix && mic?.enable,
    );
    if (currentMicroServices?.options) {
      return currentMicroServices?.options;
    }
    throw new Error(`Service not found`);
  }

  private extractServicePrefix(req: Request): string {
    const segments = req.path.split('/').filter(Boolean).slice(0, 2);
    return `/${segments.join('/')}`;
  }

  private handleProxyReq(proxyReq: any, req: Request): void {
    // TODO
    // setup customize header to next
    const userId = (req as any).user?.id || 'anonymous';
    proxyReq.setHeader('X-User-Id', userId);
    fixRequestBody(proxyReq, req);
  }

  private handleProxyRes(_: any, req: Request, res: Response): void {
    const traceId = req.headers['x-trace-id'] ?? crypto.randomUUID();
    res.setHeader('X-Trace-Id', traceId);
    res.setHeader('Referrer-Policy', 'no-referrer');
  }

  private rewritePath(path: string, req: Request): string {
    const MSOptions = this.getCurrentMSOption(req);
    if (MSOptions?.gatewayPrefix && MSOptions?.pathRewrite) {
      return path.replace(MSOptions?.gatewayPrefix, MSOptions.pathRewrite);
    }
    return path;
  }
}
