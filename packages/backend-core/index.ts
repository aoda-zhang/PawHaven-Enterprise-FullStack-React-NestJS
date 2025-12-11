// ========= Modules ===========//
export { SharedModule } from './commonModules/shared.module';
export { ConfigsModule } from './commonModules/configModule/configs.module';
export { HttpClientModule } from './commonModules/httpClient/httpClient.module';

// ========= Services ===========//

export { HttpClientService } from './commonModules/httpClient/HttpClient.service';
export { SwaggerService } from './commonModules/swagger/swagger.service';

// ========= Filter & Interceptors =========== //

export { HttpExceptionFilter } from './commonModules/httpClient/httpExceptionFilter';
export { HttpSuccessInterceptor } from './commonModules/httpClient/httpInterceptor';

// ========= constants =========== //

export { microServiceNames } from './constants/microServiceNames';
export { httpBusinessMappingCodes } from './constants/httpBusinessMappingCodes';

// ========= Types =========== //
export {
  SharedModuleProviders,
  SharedModuleFeatures,
} from './types/shareModule.types';

export { HttpBusinessCode, HttpReqHeader } from './types/http.types';
export type { HttpResType } from './types/http.types';
