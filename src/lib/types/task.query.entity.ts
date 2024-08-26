import { TaskState } from '../variables/task.state';
import { SortDirection } from '../variables/sort-direction';

export interface TaskQueryEntity {
  limit?: string;
  state?: TaskState;
  sortProperty?: string;
  sortDirection?: SortDirection;
}
