import { Injectable } from '@nestjs/common';
import { TaskList, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: TaskList = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description for Task 1',
      status: TaskStatus.DONE,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description for Task 2',
      status: TaskStatus.DONE,
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description for Task 3',
      status: TaskStatus.DONE,
    },
  ];

  getAllTasks() {
    return this.tasks;
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

  updateTask(id: string, status: TaskStatus) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task.status = status;
      }

      return task;
    });
  }
}
