import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';

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
}
