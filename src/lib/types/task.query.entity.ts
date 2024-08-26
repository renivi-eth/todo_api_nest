import { TaskState } from '../variables/task.state';
import { SortDirection } from '../variables/sort-direction';
import { IsEnum, IsString, Length } from 'class-validator';

export class TaskQueryEntity {
  @IsString()
  @Length(1, 100)
  limit?: string;

  @IsString()
  state?: TaskState;

  @IsString()
  sortProperty?: string;

  @IsEnum(SortDirection)
  sortDirection?: SortDirection;
}
