import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { TaskCardComponent } from "../task-card/task-card.component";
import { EditTaskModalComponent } from '../../edit-task-modal/edit-task-modal.component';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [
    TaskCardComponent,
    CommonModule,
    FormsModule,
    EditTaskModalComponent,
    TaskdetailComponent
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('topOfBoard') topOfBoard!: ElementRef;

  tasks: {
    title: string;
    description: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
    createdAt: Date;
  }[] = [];

  tasksub!: Subscription;

  newTask: string = '';
  newDesc: string = '';
  newPriority: 'Low' | 'Medium' | 'High' = 'Low';  
  errormsg: string = '';

  isEditModalOpen = false;
  modalTaskIndex: number | null = null;
  modalTitle: string = '';
  modalDesc: string = '';

  isViewModalOpen = false;
  selectedViewTask: {
    title: string;
    description: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
    createdAt: Date;
  } | null = null;

  constructor(private taskservice: TaskService, private router: Router) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.tasksub = this.taskservice.tasks$.subscribe(data => {
      this.tasks = data;
    });
  }

  ngOnDestroy(): void {
    this.tasksub.unsubscribe();
  }

  onInputChange() {
    if (this.newTask.trim()) {
      this.errormsg = '';
    }
  }

  AddnewTask() {
    if (this.newTask.trim() === '') {
      this.errormsg = 'Please enter task and submit';
    } else {
      this.taskservice.addTask(this.newTask.trim(), this.newDesc.trim(), this.newPriority);
      this.newTask = '';
      this.newDesc = '';
      this.newPriority = 'Low';  
      this.errormsg = '';
    }
  }

  OnTaskDelete(title: string) {
    this.taskservice.DeleteTask(title);
  }

  OnEditTask(index: number) {
    const task = this.tasks[index];
    this.modalTitle = task.title;
    this.modalDesc = task.description;
    this.modalTaskIndex = index;
    this.isEditModalOpen = true;
  }

  onSaveEdit(updated: { title: string; description: string }) {
    if (this.modalTaskIndex !== null) {
      this.taskservice.updateTask(this.modalTaskIndex, updated.title, updated.description);
      this.closeModal();
    }
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.modalTaskIndex = null;
  }

  openViewModal(task: {
    title: string;
    description: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
    createdAt: Date;
  }) {
    this.selectedViewTask = task;
    this.isViewModalOpen = true;
  }

  closeViewModal() {
    this.isViewModalOpen = false;
    this.selectedViewTask = null;
  }

  OnTaskcompletion(title: string) {
    this.taskservice.markTaskDone(title);
    this.topOfBoard.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
