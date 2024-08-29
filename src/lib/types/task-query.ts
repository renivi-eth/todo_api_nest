import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { SortDirection } from '../variables/sort-direction';
import { SortTagProperty } from '../variables/sort-tag-property';
import { TaskState } from '../variables/task-state';

export class TaskQuery {
  // TODO: Разобраться с 'class-transformer' и сделать декоратор @ToInt
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: string;

  @IsEnum(TaskState)
  state?: TaskState;

  // Указать по дефолту значение
  @IsEnum(SortTagProperty)
  sortProperty?: SortTagProperty.CREATED_AT;

  @IsEnum(SortDirection)
  sortDirection?: SortDirection;
}
