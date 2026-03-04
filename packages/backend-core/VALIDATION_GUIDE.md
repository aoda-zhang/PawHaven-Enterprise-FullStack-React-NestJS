# Global Zod Validation Pipe Guide

This guide shows how to use the new global `ZodValidationPipe` with the `@ValidateWithSchema` decorator across all backend services.

## Setup

### 1. Register the Global Pipe in `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@pawhaven/backend-core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  imports: [
    // ... your modules
  ],
})
export class AppModule {}
```

## Usage

### Method 1: Auto-Validate with Schema (Recommended)

Use the `@ValidateWithSchema` decorator on your route handler. The schema is read from metadata by the global pipe.

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { ValidateWithSchema } from '@pawhaven/backend-core';
import { LoginSchema, type LoginDto } from '@pawhaven/shared/types';

@Controller('auth')
export class AuthController {
  @Post('/login')
  @ValidateWithSchema(LoginSchema)
  async login(@Body() loginDto: LoginDto) {
    // loginDto is already validated against LoginSchema
    // ...
  }
}
```

### Method 2: Instance-Based (Backward Compatibility)

For specific endpoints, you can still use the instance-based approach:

```typescript
import { UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@pawhaven/backend-core';

@Post('/custom')
@UsePipes(new ZodValidationPipe(CustomSchema))
async customEndpoint(@Body() data: CustomDto) {
  // ...
}
```

### Method 3: Skip Validation

Routes without `@ValidateWithSchema` are not validated:

```typescript
@Get('/public')
async public() {
  // No validation applied
}
```

## Examples Across Services

### Auth Service

```typescript
import { ValidateWithSchema, LoginSchema } from '@pawhaven/backend-core';

@Post('/login')
@ValidateWithSchema(LoginSchema)
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto.email, loginDto.password);
}
```

### Bootstrap/Core Service

```typescript
import { ValidateWithSchema } from '@pawhaven/backend-core';
import { MenuItemSchema } from '@pawhaven/shared/types';

@Post('/menu')
@ValidateWithSchema(MenuItemSchema)
async createMenu(@Body() menu: MenuItem) {
  return this.bootService.addMenuItem(menu);
}

@Post('/router')
@ValidateWithSchema(RouterItemSchema)
async createRouter(@Body() router: RouterItem) {
  return this.bootService.addAppRouter(router);
}
```

### Document Service

```typescript
@Post('/upload')
@ValidateWithSchema(DocumentUploadSchema)
async uploadDocument(@Body() data: DocumentUploadDto) {
  return this.documentService.upload(data);
}
```

## Error Handling

When validation fails, a `BadRequestException` is thrown with a structured error response:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "path": "email",
      "message": "Invalid email address"
    },
    {
      "path": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

## Benefits

✅ **Single source of truth**: Define validation once in shared schemas
✅ **Cleaner routes**: No need for `@Body()` with multiple decorators
✅ **Type safety**: Types auto-inferred from Zod schemas
✅ **Shared schemas**: Use same validation in frontend & backend
✅ **Zero boilerplate**: Just add `@ValidateWithSchema(Schema)`
✅ **Global enforcement**: All routes validated when schema is provided
✅ **No magic**: Explicit decorator on each route

## Creating New Schemas

### 1. Define in Shared Package

```typescript
// packages/shared/types/product.schema.ts
import { z } from 'zod';

export const ProductCreateSchema = z.object({
  name: z.string().min(1, 'Name required'),
  price: z.number().positive(),
  description: z.string().optional(),
});

export type ProductCreateDto = z.infer<typeof ProductCreateSchema>;
```

### 2. Export from Index

```typescript
// packages/shared/types/index.ts
export { ProductCreateSchema, type ProductCreateDto } from './product.schema';
```

### 3. Use in Service

```typescript
// apps/backend/product-service/src/product.controller.ts
import { ProductCreateSchema, type ProductCreateDto } from '@pawhaven/shared/types';

@Post('/')
@ValidateWithSchema(ProductCreateSchema)
create(@Body() dto: ProductCreateDto) {
  return this.service.create(dto);
}
```

## Restrictions & Edge Cases

### Routes with No Schema

Routes without `@ValidateWithSchema` skip validation:

```typescript
@Get('/')
getAll() {
  // No validation
}
```

### Multiple Body Properties

For the decorator approach, put it on the first parameter:

```typescript
// Works ✅
@Post('/test')
@ValidateWithSchema(TestSchema)
test(@Body() body: TestDto, @Query() query: QueryParams) {
  // body validated, query is not
}

// For query validation, create separate decorator or schema
@Post('/test')
@ValidateWithSchema(TestBodySchema)
@ValidateWithSchema(TestQuerySchema) // Multiple decorators work
test(@Body() body: TestDto, @Query() query: QueryParams) {
  // Both validated
}
```

## Migration from class-validator

**Before (class-validator):**

```typescript
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

@Post('/login')
@UsePipes(new ValidationPipe())
login(@Body() dto: LoginDto) { }
```

**After (Zod):**

```typescript
// In shared package
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof LoginSchema>;

// In service
@Post('/login')
@ValidateWithSchema(LoginSchema)
login(@Body() dto: LoginDto) { }
```

## TypeScript Tips

### Type Inference

Get exact types from schemas:

```typescript
import { type LoginDto } from '@pawhaven/shared/types';

// LoginDto is exactly the shape of LoginSchema
const user: LoginDto = {
  email: 'test@example.com',
  password: 'password123',
};
```

### Custom Error Messages

```typescript
export const CustomSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  age: z.number().min(18, 'Must be 18 or older'),
});
```

---

For schema examples, see:

- Auth schemas: `packages/shared/types/auth.schema.ts`
- Menu schemas: `packages/shared/types/menu.schema.ts`
- Router schemas: `packages/shared/types/router.schema.ts`
