import AuthDBCollections from '@models/auth.DBcollection';
import { UserSchema } from '@models/user.schema';
import ACLModule from '@modules/ACL/ACLs.module';
import UserModule from '@modules/User/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthDBCollections.USER, schema: UserSchema },
    ]),
    JwtModule,
    ACLModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
