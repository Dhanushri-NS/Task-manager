import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: 'Low' | 'Medium' | 'High';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private taskSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.taskSubject.asObservable();

  constructor() {}

  addTask(task: string, desc: string, priority: 'Low' | 'Medium' | 'High'): void {
    this.tasks.push({
      title: task,
      description: desc,
      completed: false,
      priority:priority,
      createdAt: new Date()
    });
    this.taskSubject.next(this.tasks);
  }

  DeleteTask(title: string): void {
    this.tasks = this.tasks.filter(t => t.title !== title);
    this.taskSubject.next(this.tasks);
  }

  updateTask(index: number, newTitle: string, newDesc: string): void {
    this.tasks[index].title = newTitle;
    this.tasks[index].description = newDesc;
    this.taskSubject.next(this.tasks);
  }

  markTaskDone(title: string): void {
    const task = this.tasks.find(t => t.title === title);
    if (task) task.completed = true;
  }

  getTaskByIndex(index: number): Task | undefined {
    return this.tasks[index];
  }

  completeTask(title: string): void {
    const task = this.tasks.find(t => t.title === title);
    if (task) {
      task.completed = true;
    }
  }
}
