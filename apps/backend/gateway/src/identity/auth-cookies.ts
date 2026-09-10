/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cookieKeys, httpHeaders } from '@pawhaven/backend-core/constants';
import { isProd } from '@pawhaven/shared/utils';
import type { Request, Response } from 'express';

const CLEAR_COOKIE_OPTIONS = 'Path=/; Max-Age=0; HttpOnly; SameSite=Strict';
const PROD_SECURE_SUFFIX = '; Secure';
const COOKIE_ENTRY_PATTERN = /^([^=]+)=([^;]+)/;

@Injectable()
export class AuthCookies {
  private readonly secureSuffix: string;

  constructor(configService: ConfigService) {
    this.secureSuffix = isProd(configService.get<string>('http.env'))
      ? PROD_SECURE_SUFFIX
      : '';
  }

  apply(req: Request, res: Response, setCookieHeaders: string[]): void {
    setCookieHeaders.forEach((cookie) => {
      res.append(httpHeaders.setCookie, cookie);
      const match = cookie.match(COOKIE_ENTRY_PATTERN);
      if (match) {
        const [, name, value] = match;
        req.cookies = req.cookies ?? {};
        req.cookies[name] = value;
        this.upsertCookieHeader(req, name, value);
      }
    });
  }

  clear(req: Request, res: Response): void {
    res.append(
      httpHeaders.setCookie,
      `${cookieKeys.access_token}=; ${CLEAR_COOKIE_OPTIONS}${this.secureSuffix}`,
    );
    res.append(
      httpHeaders.setCookie,
      `${cookieKeys.refresh_token}=; ${CLEAR_COOKIE_OPTIONS}${this.secureSuffix}`,
    );

    req.cookies = req.cookies ?? {};
    delete req.cookies[cookieKeys.access_token];
    delete req.cookies[cookieKeys.refresh_token];

    if (req.headers[httpHeaders.cookie]) {
      const parts = (req.headers[httpHeaders.cookie] ?? '')
        .split(';')
        .map((part) => part.trim())
        .filter(
          (part) =>
            !part.startsWith(`${cookieKeys.access_token}=`) &&
            !part.startsWith(`${cookieKeys.refresh_token}=`),
        );
      req.headers[httpHeaders.cookie] = parts.join('; ');
    }
  }

  private upsertCookieHeader(req: Request, name: string, value: string): void {
    const parts = (req.headers[httpHeaders.cookie] ?? '')
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean);
    const entry = `${name}=${value}`;
    const index = parts.findIndex((part) => part.startsWith(`${name}=`));
    if (index >= 0) {
      parts[index] = entry;
    } else {
      parts.push(entry);
    }
    req.headers[httpHeaders.cookie] = parts.join('; ');
  }
}
