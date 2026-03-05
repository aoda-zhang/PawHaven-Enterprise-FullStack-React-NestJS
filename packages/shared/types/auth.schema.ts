import { z } from 'zod';

/**
 * Auth schemas used by frontend & backend
 */

/**
 * Login Request Schema
 */
export const LoginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginDto = z.infer<typeof LoginSchema>;

/**
 * Register Request Schema
 */
export const RegisterSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().optional(),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;

/**
 * Auth Response Schema
 */
export const AuthResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string().optional(),
  }),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;

/**
 * JWT Payload Schema
 */
export const JwtPayloadSchema = z.object({
  userId: z.string(),
  email: z.string(),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

/**
 * Verify Response Schema
 */
export const VerifyResponseSchema = z.object({
  isValid: z.boolean(),
  payload: JwtPayloadSchema,
});

export type VerifyResponseDto = z.infer<typeof VerifyResponseSchema>;
