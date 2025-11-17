import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { HttpSettingMiddleware } from './httpSetting.middleware'

@Module({
    providers: []
})
export default class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(HttpSettingMiddleware)
            .exclude(
                // exlude health route
                { path: 'health', method: RequestMethod.GET }
            )
            .forRoutes({
                path: '*',
                method: RequestMethod.ALL
            })
    }
}
