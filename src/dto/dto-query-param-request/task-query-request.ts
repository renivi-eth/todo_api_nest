import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TaskState } from '../../lib/variables/task-state';
import { SortProperty } from '../../lib/variables/sort-property';
import { SortDirection } from '../../lib/variables/sort-direction';
import { TransformStringToNumber } from '../../lib/decorators/validate-to-int';

/**
 * DTO для QueryParam по задачам - limit, sortProperty, sortDirection
 */
export class TaskQueryDTO {
  // Кастомный декоратор, проверка лимита на целое число, длина от 1 до 100
  @IsOptional()
  @TransformStringToNumber()
  @IsInt()
  @Max(100)
  @Min(1)
  limit?: number;

  // Проверка на enum (backlog, in-progress, done), фильтрация по состоянию задачи
  @IsOptional()
  @IsEnum(TaskState)
  state?: TaskState;

  // Проверка на строку, какое поле нужно сортировать - name, created_at, по дефолту по name
  @IsEnum(SortProperty)
  sortProperty = SortProperty.CREATED_AT;

  // Проверка на ASC, DESC (по возрастанию /убыванию), направление сортировки - по возрастанию / убыванию
  @IsEnum(SortDirection)
  sortDirection = SortDirection.DESC;
}
