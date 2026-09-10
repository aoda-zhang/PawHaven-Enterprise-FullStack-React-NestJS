import { Injectable } from '@nestjs/common';

import { TokenDenylist } from './token-denylist';

const MS_PER_SECOND = 1000;

@Injectable()
export class InMemoryTokenDenylist extends TokenDenylist {
  private readonly deniedJtis = new Map<string, number>();

  isDenied(jti?: string): boolean {
    if (!jti) {
      return false;
    }
    const expiry = this.deniedJtis.get(jti);
    if (expiry === undefined) {
      return false;
    }
    if (expiry <= InMemoryTokenDenylist.nowInSeconds()) {
      this.deniedJtis.delete(jti);
      return false;
    }
    return true;
  }

  deny(jti: string, exp: number): void {
    this.deniedJtis.set(jti, exp);
  }

  private static nowInSeconds(): number {
    return Math.floor(Date.now() / MS_PER_SECOND);
  }
}
