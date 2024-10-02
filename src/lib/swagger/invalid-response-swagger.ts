import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

// Общий декоратор для ошибок в сваггере
export function BadResponse() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Invalid body or query param' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
    ApiUnauthorizedResponse({ description: 'Invalid or expired JWT token' }),
  );
}
