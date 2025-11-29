import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { AllRpcExceptionsFilter } from '@shared/core/httpClient/rpcExceptionFillter'

async function bootstrap() {
    const appContext = await NestFactory.createApplicationContext(AppModule)
    const configService = appContext.get(ConfigService)

    const port = configService.get<number>('http.port', 8083)
    const host = configService.get<string>('http.host', '0.0.0.0')

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host,
            port
        }
    })
    app.useGlobalFilters(new AllRpcExceptionsFilter())

    await app.listen()
}
bootstrap()
