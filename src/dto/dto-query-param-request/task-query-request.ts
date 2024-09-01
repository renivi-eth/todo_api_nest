import { IsEnum, IsOptional } from 'class-validator';
import { ToInt } from '../../lib/decorators/validate-to-int';
import { SortDirection } from '../../lib/variables/sort-direction';
import { SortTagProperty } from '../../lib/variables/sort-tag-property';
import { TaskState } from '../../lib/variables/task-state';

export class TaskQueryDTO {
  @ToInt()
  @IsOptional()
  limit?: string;

  @IsEnum(TaskState)
  @IsOptional()
  state?: TaskState;

  @IsEnum(SortTagProperty)
  @IsOptional()
  sortProperty?: SortTagProperty.CREATED_AT;

  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection;
}
