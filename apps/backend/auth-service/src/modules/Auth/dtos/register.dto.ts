import { createZodDto } from 'nestjs-zod';
import { RegisterSchema } from '@pawhaven/shared/types';

export class RegisterDTO extends createZodDto(RegisterSchema) {}
