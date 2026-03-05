# HTTP Client Module

This module provides HTTP client utilities, global exception filtering, and response formatting for PawHaven backend services.

## Purpose

- **HTTP Client Service**: Wrapper around Axios for making outbound HTTP requests
- **Exception Filter**: Global filter that catches and formats all exceptions consistently
- **Success Interceptor**: Wraps all successful responses in a standard format
- **Consistent API responses**: Ensures all responses follow the same structure

## Components

### HttpClient.service.ts

Service for making HTTP requests to external APIs or other microservices:

- Built on top of `@nestjs/axios` (Axios wrapper)
- Provides methods for GET, POST, PUT, DELETE, etc.
- Includes error handling and retry logic

### httpExceptionFilter.ts

Global exception filter that:

- Catches all thrown exceptions (HTTP and non-HTTP)
- Formats exceptions into consistent response structure
- Logs errors for debugging
- Handles both HTTP and RPC contexts
- Returns standardized error responses

### httpInterceptor.ts

Global success interceptor that:

- Wraps all successful responses in a standard format
- Adds metadata like status, isSuccess flag
- Ensures consistent response structure across all endpoints

### httpClient.module.ts

Module that:

- Exports HttpClientService for dependency injection
- Registered globally via SharedModule
- Pre-configured with HttpModule from `@nestjs/axios`

## Usage

### Making HTTP Requests

Inject HttpClientService to make outbound requests:

```typescript
import { Injectable } from '@nestjs/common';
import { HttpClientService } from '@pawhaven/backend-core/dynamicModules/httpClient/HttpClient.service';

@Injectable()
export class MyService {
  constructor(private httpClient: HttpClientService) {}

  async fetchExternalData() {
    // Make GET request
    const response = await this.httpClient.get('https://api.example.com/data');
    return response.data;
  }

  async postData(payload: any) {
    // Make POST request
    const response = await this.httpClient.post(
      'https://api.example.com/users',
      payload,
    );
    return response.data;
  }
}
```

### Response Format

All successful responses are automatically wrapped:

```typescript
// Your handler returns:
@Get('/users')
getUsers() {
  return [{ id: 1, name: 'John' }];
}

// Client receives:
{
  "status": 200,
  "isSuccess": true,
  "message": "Request successful",
  "data": [
    { "id": 1, "name": "John" }
  ]
}
```

### Error Format

All exceptions are automatically formatted:

```typescript
// Your handler throws:
@Get('/users/:id')
getUser(@Param('id') id: string) {
  throw new NotFoundException('User not found');
}

// Client receives:
{
  "status": 404,
  "isSuccess": false,
  "message": "User not found",
  "data": null
}
```

### Custom Exceptions

Throw standard NestJS HTTP exceptions:

```typescript
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

@Post('/login')
login(@Body() credentials: LoginDto) {
  if (!credentials.email) {
    throw new BadRequestException('Email is required');
  }

  if (!isValid(credentials)) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return this.authService.login(credentials);
}
```

### Using Business Error Codes

Use predefined business error codes:

```typescript
import { httpBusinessMappingCodes } from '@pawhaven/backend-core/constants';
import { UnauthorizedException } from '@nestjs/common';

@Get('/protected')
getProtectedResource() {
  throw new UnauthorizedException(httpBusinessMappingCodes.unauthorized);
}
```

## Response Structure

### Success Response

```typescript
interface SuccessResponse<T> {
  status: number; // HTTP status code (200, 201, etc.)
  isSuccess: true; // Always true for success
  message: string; // Success message
  data: T; // Your response data
}
```

### Error Response

```typescript
interface ErrorResponse {
  status: number; // HTTP status code (400, 401, 404, 500, etc.)
  isSuccess: false; // Always false for errors
  message: string; // Error message
  data: null; // Always null for errors
}
```

## Exception Handling Flow

1. **Exception thrown** in any handler/service
2. **HttpExceptionFilter catches** the exception
3. **Extract error details**: status, message, data
4. **Log error** for debugging (includes stack trace for 500 errors)
5. **Format response** according to standard structure
6. **Send to client** with appropriate HTTP status code

## HTTP Status Codes

The filter handles all standard HTTP status codes:

- **200**: OK - Request successful
- **201**: Created - Resource created successfully
- **400**: Bad Request - Invalid input
- **401**: Unauthorized - Missing or invalid authentication
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Unexpected server error

## Context Support

The exception filter supports both HTTP and RPC contexts:

```typescript
// HTTP Context (REST API)
const ctx = host.switchToHttp();
const response = ctx.getResponse();

// RPC Context (Microservices)
const ctx = host.switchToRpc();
const data = ctx.getData();
```

## Best Practices

1. **Use specific exceptions**: Use appropriate HTTP exceptions (NotFoundException, BadRequestException, etc.)
2. **Provide clear messages**: Write user-friendly error messages
3. **Log appropriately**: The filter logs automatically, but add context where needed
4. **Validate early**: Validate input early to throw meaningful errors
5. **Don't expose internals**: Never expose internal error details or stack traces to clients

### Example: Proper Error Handling

```typescript
@Injectable()
export class UserService {
  async getUser(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw HTTP exceptions
      }

      // Log unexpected errors
      this.logger.error('Failed to fetch user', error);

      // Throw generic error
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }
}
```

## Customization

### Custom Exception Filter

Extend or replace the default filter:

```typescript
import { HttpExceptionFilter } from '@pawhaven/backend-core/dynamicModules/httpClient/httpExceptionFilter';

@Catch()
export class CustomExceptionFilter extends HttpExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    // Add custom logic
    super.catch(exception, host);
  }
}
```

### Custom Success Interceptor

Modify response format:

```typescript
import { HttpSuccessInterceptor } from '@pawhaven/backend-core/dynamicModules/httpClient/httpInterceptor';

@Injectable()
export class CustomSuccessInterceptor extends HttpSuccessInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 200,
        isSuccess: true,
        message: 'Custom success message',
        data,
        timestamp: new Date().toISOString(), // Add timestamp
      })),
    );
  }
}
```

## Troubleshooting

**Problem**: Responses not wrapped in standard format  
**Solution**: Ensure SharedModule is imported in your app module

**Problem**: Custom exceptions not formatted correctly  
**Solution**: Ensure you're throwing NestJS HTTP exceptions, not generic Error objects

**Problem**: Error details exposed to client  
**Solution**: The filter hides internal errors by default; check you're not manually exposing them

## Type Definitions

```typescript
// packages/backend-core/types/http.types.ts
export interface HttpResType<T = any> {
  status: number;
  isSuccess: boolean;
  message: string;
  data: T | null;
}
```

---

For questions or issues, contact the backend team.
