import { Request } from 'express'

import { HttpReqHeader } from "../core/httpClient/interface"

export const getTokenFromHeader = (request: Request) => {
  if (request?.headers?.[HttpReqHeader.accessToken]) {
    return request?.headers?.[HttpReqHeader.accessToken]
  }
  const [type, token] = request?.headers?.authorization?.split(' ') ?? []
  return type === 'Bearer' ? token : undefined
}
