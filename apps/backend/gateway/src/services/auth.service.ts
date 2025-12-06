import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  test(id: string) {
    return {
      name: `test-${id}`,
    };
  }
}
