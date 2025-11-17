// No token verify route
import { SetMetadata } from '@nestjs/common';
import { Decorators } from '@pawhaven/backend-core/constants/enum';

const NoToken: () => MethodDecorator = () =>
  SetMetadata(Decorators.noToken, true);
export default NoToken;
