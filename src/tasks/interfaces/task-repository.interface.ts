import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { filterTasksDto } from '../dto/filter-task.dto';
import { TaskStatus } from '../task-status.enum';

export interface ITaskRepository {
  findAll(filterDto: filterTasksDto): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(createTaskDto: CreateTaskDto): Promise<Task>;
  delete(id: string): Promise<boolean>;
  updateStatus(id: string, status: TaskStatus): Promise<boolean>;
}
