import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MSClientNames } from '../../constants/constant';

@Injectable()
export default class MSService {
  constructor(
    @Inject(MSClientNames.MS_TRIP)
    private readonly tripClient: ClientProxy,
    @Inject(MSClientNames.MS_DOCUMENT)
    private readonly documentClient: ClientProxy,
  ) {}
}
