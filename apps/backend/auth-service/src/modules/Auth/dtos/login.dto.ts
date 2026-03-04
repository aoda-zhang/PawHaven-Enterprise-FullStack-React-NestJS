import { createZodDto } from 'nestjs-zod';
import { LoginSchema } from '@pawhaven/shared/types';

export class LoginDTO extends createZodDto(LoginSchema) {}
