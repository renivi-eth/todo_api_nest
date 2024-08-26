import { TaskState } from '../variables/task-state';
import { SortDirection } from '../variables/sort-direction';
import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

// TODO: Разобраться с 'class-transformer' и сделать декоратор @ToInt

export class TaskQuery {
  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: string;

  @IsEnum(TaskState)
  state?: TaskState;

  @IsEnum(SortTagProperty)
  sortProperty = SortTagProperty.CREATED_AT;

  @IsEnum(SortDirection)
  sortDirection?: SortDirection;
}
