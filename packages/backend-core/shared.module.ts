import { DynamicModule, Global, Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import ConfigsModule from './core/configModule/configs.module'
import DatabaseModule from './core/dataBase/db.module'
import HttpExceptionFilter from './core/httpClient/httpExceptionFilter'
import HttpSuccessInterceptor from './core/httpClient/httpInterceptor'
import MSClientModule from './core/microServiceClient/msClient.module'
import MiddlewareModule from './middlewares/index.module'
import HttpClientModule from './core/httpClient/httpClient.module'
interface SharedModuleOptions {
    // the env config file path, e.g.
    // const currentEnv = process.env.NODE_ENV ?? 'uat'
    // const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
    configFilePath: string
    isIntergrateMiddware?: boolean
    isIntergrateHttpInterceptor?: boolean
    isIntergrateHttpExceptionFilter?: boolean
}
@Global()
@Module({})
class SharedModule {
    static forRoot(options: SharedModuleOptions): DynamicModule {
        const {
            configFilePath,
            isIntergrateMiddware = true,
            isIntergrateHttpExceptionFilter = false,
            isIntergrateHttpInterceptor = false
        } = options

        const getImports = () => {
            let imports: DynamicModule[] = []
            if (configFilePath) {
                imports = [...imports, ConfigsModule.forRoot(configFilePath)]
            }
            // dynamic db connection
            imports = [...imports, DatabaseModule.forRoot(configFilePath)]

            // middleware
            if (isIntergrateMiddware) {
                imports = [...imports, { module: MiddlewareModule }]
            }

            // microservice register - support both approaches
            imports = [...imports, MSClientModule.register(configFilePath)]

            return imports
        }

        const getProviders = () => {
            let providers: any[] = []
            if (isIntergrateHttpExceptionFilter) {
                // catch http error
                providers = [
                    ...providers,
                    {
                        provide: APP_FILTER,
                        useClass: HttpExceptionFilter
                    }
                ]
            }
            if (isIntergrateHttpInterceptor) {
                // catch http success
                providers = [
                    ...providers,
                    {
                        provide: APP_INTERCEPTOR,
                        useClass: HttpSuccessInterceptor
                    }
                ]
            }

            return providers
        }
        return {
            module: SharedModule,
            imports: [...(getImports() ?? []), HttpClientModule],
            providers: getProviders()
        }
    }
}

export default SharedModule
