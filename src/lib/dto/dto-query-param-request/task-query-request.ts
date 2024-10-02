import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TaskState } from '../../variables/task-state';
import { SortProperty } from '../../variables/sort-property';
import { SortDirection } from '../../variables/sort-direction';
import { TransformStringToNumber } from '../../decorators/validate-to-int';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для QueryParam по задачам - limit, sortProperty, sortDirection
 */
export class TaskQueryDTO {
  @ApiProperty({ description: 'Limit for task from 1 to 100', required: false })
  // Кастомный декоратор, проверка лимита на целое число, длина от 1 до 100
  @IsOptional()
  @TransformStringToNumber()
  @IsInt()
  @Max(100)
  @Min(1)
  limit?: number;

  @ApiProperty({ description: 'State task', enum: ['backlog', 'in-progress', 'done'], required: false })
  // Проверка на enum (backlog, in-progress, done), фильтрация по состоянию задачи
  @IsOptional()
  @IsEnum(TaskState)
  state?: TaskState;

  @ApiProperty({ description: 'Sort Property', enum: ['created_at', 'name'], required: false })
  // Проверка на строку, какое поле нужно сортировать - name, created_at, по дефолту по name
  @IsEnum(SortProperty)
  sortProperty = SortProperty.CREATED_AT;

  @ApiProperty({ description: 'asc / desc', enum: ['ASC', 'DESC'], required: false })
  // Проверка на ASC, DESC (по возрастанию /убыванию), направление сортировки - по возрастанию / убыванию
  @IsEnum(SortDirection)
  sortDirection = SortDirection.DESC;
}
