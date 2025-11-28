import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import i18n from 'i18n'

import { AppModule } from './app.module'

async function bootstrap() {
  // Hybrid application
  // can be used as a microservice or a web service both
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  })

  // Initialize i18n
  app.use(i18n.init)

  // global service prefix
  const prefix = app.get(ConfigService).get('http.prefix') ?? ''
  app.setGlobalPrefix(prefix)

  // Version control like v1 v2
  app.enableVersioning({
    type: VersioningType.URI
  })

  // DTO pipe settings
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )

  // avoid attack
  app.use(helmet())

  const port = app.get(ConfigService).get('http.port') ?? 8082
  // As a web service
  await app
    .listen(port, '0.0.0.0')
    .catch((error) => {
      console.error(`MS_Document start error:${error}`)
    })
}
bootstrap()
