import { Request } from 'express'

import { HttpReqHeader } from '@shared/core/httpClient/interface'

const getTokenFromHeader = (request: Request) => {
    if (request?.headers?.[HttpReqHeader.accessToken]) {
        return request?.headers?.[HttpReqHeader.accessToken]
    }
    const [type, token] = request?.headers?.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
}
export default getTokenFromHeader
