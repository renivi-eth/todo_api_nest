import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
/**
 * Общий декратор для ошибок связи задачи с тэгом - tag/:tagId/task/:taskId
 */
export function TaskTagBadResponse() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Invalid body or query param' }),
    ApiUnauthorizedResponse({ description: 'Invalid or expired JWT token' }),
    ApiResponse({ status: 400, description: 'Invalid query param (tagId or taskId)' }),
    ApiResponse({ status: 409, description: 'Relation already exist' }),
    ApiResponse({ status: 500, description: 'Database query error' }),
    ApiResponse({ status: 400, description: 'Unexpected error' }),
    ApiResponse({ status: 401, description: 'Task not found' }),
    ApiResponse({ status: 401, description: 'Tag not found' }),
  );
}
