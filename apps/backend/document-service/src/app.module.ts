import path from 'node:path'
import { Module } from '@nestjs/common'
import SharedModule from '@shared/shared.module'
import EmailModule from './modules/Email/email.module'
import PDFModule from './modules/PDF/PDF.module'
import { EnvConstant } from '@shared/constants/constant'
import FileModule from '@modules/File/file.module'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
@Module({
    imports: [
        SharedModule.forRoot({
            configFilePath
        }),
        EmailModule,
        PDFModule,
        FileModule
    ],
    providers: []
})
export class AppModule {}
