import { Body, Controller, Put } from '@nestjs/common'

import ACLPermissions from '@modules/ACL/middlewares/ACL.decorator'
import UserService from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ACLPermissions(['USER_ROLE_EDIT'])
    @Put('/role/update')
    addUserRoles(@Body() body: { userID: string; roles: string[] }) {
        return this.userService.addUserRoles(body?.userID, body?.roles)
    }
}
