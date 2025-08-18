import { TaskStatus } from '../tasks.model';

export class filterTasksDto {
  search?: string;
  status?: TaskStatus;
}
