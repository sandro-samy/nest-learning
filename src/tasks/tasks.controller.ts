import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./tasks.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string) {
    const task = this.tasksService.getTaskById(id);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    return task;
  }

  @Post("/")
  createTask(@Body() createTaskDto: CreateTaskDto) {
    console.log("Creating task with DTO:", createTaskDto);
    if (!createTaskDto.title || !createTaskDto.description) {
      throw new Error("Title and description are required to create a task");
    }
    return this.tasksService.craeteTask(createTaskDto);
  }
}
