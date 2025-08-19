import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { filterTasksDto } from './dto/filter-task.dto';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TaskRepository) {}

  async getAllTasks(filterDto: filterTasksDto) {
    return await this.tasksRepository.findAll(filterDto);
  }

  async getTaskById(id: string) {
    const task = await this.tasksRepository.findById(id);
    if (!task) throw new NotFoundException(`Task with id: ${id} not found`);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.create(createTaskDto);
  }

  async deleteTask(id: string) {
    const deleted = await this.tasksRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return 'Task deleted';
  }

  async updateTask(id: string, status: TaskStatus) {
    const updated = await this.tasksRepository.updateStatus(id, status);
    if (!updated) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return 'Task updated';
  }
}
