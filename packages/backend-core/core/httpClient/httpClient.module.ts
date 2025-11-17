import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import HttpClientService from './HttpClient.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export default class HttpClientModule {}
