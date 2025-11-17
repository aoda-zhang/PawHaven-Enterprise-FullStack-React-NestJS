import { Injectable, type NestMiddleware } from '@nestjs/common'
import { HttpReqHeader } from '../core/httpClient/interface'
import type { NextFunction, Request, Response } from 'express'
import getTokenFromHeader from '../utils/overWriteHeader'
@Injectable()
export class HttpSettingMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: NextFunction) {
        const token = getTokenFromHeader(req)
        // Override the access-token header with the Bearer token
        req.headers[HttpReqHeader.accessToken] = token
        next()
    }
}
