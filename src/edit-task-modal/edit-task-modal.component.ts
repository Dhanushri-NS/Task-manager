import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.css',
})
export class EditTaskModalComponent {
  @Input() title: string = '';
  @Input() description: string = '';

  @Output() save = new EventEmitter<{ title: string; description: string }>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit({ title: this.title, description: this.description });
  }

  onCancel() {
    this.cancel.emit();
  }
}
