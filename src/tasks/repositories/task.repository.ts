import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { filterTasksDto } from '../dto/filter-task.dto';
import { TaskStatus } from '../task-status.enum';
import { ITaskRepository } from '../interfaces/task-repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(filterDto: filterTasksDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }

  async findById(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.taskRepository.save(task);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async updateStatus(id: string, status: TaskStatus): Promise<boolean> {
    const result = await this.taskRepository.update(id, { status });
    return result.affected ? result.affected > 0 : false;
  }
}
