import type { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const initSwagger = (app: INestApplication) => {
    const swaggerTitle = app.get(ConfigService).get('swagger.title') ?? ''
    const swaggerDesc = app.get(ConfigService).get('swagger.description') ?? ''
    const swaggerVersion = app.get(ConfigService).get('swagger.version') ?? ''
    const swaggerPrefix = app.get(ConfigService).get('swagger.prefix') ?? ''
    const swaggerOptions = new DocumentBuilder()
        .setTitle(swaggerTitle)
        .setDescription(swaggerDesc)
        .setVersion(swaggerVersion)
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup(swaggerPrefix, app, document)
}
export default initSwagger
