import type { Schema } from 'mongoose'

// token中需要记录的用户信息类型
export interface UserAccessInfo {
    userName: string | undefined
    userID: Schema.Types.ObjectId | undefined
    roles: string[] | undefined
}
