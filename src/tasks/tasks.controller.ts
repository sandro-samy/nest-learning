import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    return task;
  }

  @Post('/')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.craeteTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);

    return null;
  }

  @Patch('/:id/status')
  updateTask(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);

    if (!task) return null;

    const status =
      task?.status === TaskStatus.OPEN
        ? TaskStatus.IN_PROGRESS
        : TaskStatus.DONE;

    this.tasksService.updateTask(id, status);
  }
}
