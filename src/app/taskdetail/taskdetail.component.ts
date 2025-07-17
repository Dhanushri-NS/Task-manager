import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, UpperCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-taskdetail',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, DatePipe],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.css'
})
export class TaskdetailComponent {
  @Input() task: { title: string; description: string; completed: boolean; priority: string; createdAt: Date } | null = null;
  @Output() close = new EventEmitter<void>();
}
