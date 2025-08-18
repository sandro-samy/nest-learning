import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class filterTasksDto {
  @IsOptional()
  search?: string;

  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
