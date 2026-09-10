export abstract class TokenDenylist {
  abstract isDenied(jti?: string): boolean;

  abstract deny(jti: string, exp: number): void;
}
