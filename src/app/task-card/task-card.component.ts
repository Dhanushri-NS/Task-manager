import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {


   @Input() task!: { title: string; completed: boolean };
@Input() index!: number;

 @Input() taskTitle!: string;
@Input() isCompleted: boolean = false;


  @Output() completedtitle = new EventEmitter<string>();
  @Output() deleteTask= new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Number>();

  constructor(private router : ActivatedRoute){}

  ngOnInit(){
    const taskTitle = this.router.snapshot.paramMap.get('title');
  }
Donebtn() {
  this.isCompleted = true;
  this.completedtitle.emit(this.task.title);
}

Delbtn() {
  this.deleteTask.emit(this.task.title);
}
Editbtn() {
 this.editTask.emit(this.index);
}
}
