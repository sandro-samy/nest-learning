import { Injectable } from '@nestjs/common';
import { TaskList, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { filterTasksDto } from './dto/filter-tasks-dto';

@Injectable()
export class TasksService {
  private tasks: TaskList = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description for Task 1',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description for Task 2',
      status: TaskStatus.OPEN,
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description for Task 3',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getAllTasksWithFilter(filterDto: filterTasksDto) {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return task.description.includes(search) || task.title.includes(search);
      });
    }

    return tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  craeteTask(createTaskDto: CreateTaskDto) {
    if (!createTaskDto?.title || !createTaskDto?.description) {
      throw new Error('Title and description are required to create a task');
    }

    const { title, description } = createTaskDto;

    const newTask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string) {
    const task = this.getTaskById(id);

    if (!task) return null;

    const status =
      task?.status === TaskStatus.OPEN
        ? TaskStatus.IN_PROGRESS
        : TaskStatus.DONE;

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task.status = status;
      }

      return task;
    });

    return task;
  }
}
