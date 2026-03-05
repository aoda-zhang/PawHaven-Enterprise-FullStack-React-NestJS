// Only import and export core models here.
// For performance reasons, submodules are NOT exported from this index file.
// If you need a submodule, please import from its own path (see package.json exports).
export { SharedModule } from './dynamicModules/shared.module';
export { InjectPrisma } from './dynamicModules/prisma/prisma.decorators';
export { SwaggerService } from './dynamicModules/swagger/swagger.service';
export { HttpClientService } from './dynamicModules/httpClient/HttpClient.service';
export * from './dynamicModules/sharedModule.type';
