import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { filterTasksDto } from './dto/filter-tasks-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: filterTasksDto) {
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getAllTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
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
    return this.tasksService.updateTask(id);
  }
}
