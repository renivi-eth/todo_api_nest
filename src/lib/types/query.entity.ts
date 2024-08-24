import { SortDirection } from '../variables/sort-direction';
import { TaskState } from '../variables/task.state';

export interface QueryEntity {
  limit?: string;
  state?: TaskState;
  sortProperty?: string;
  sortDirection?: SortDirection;
}
