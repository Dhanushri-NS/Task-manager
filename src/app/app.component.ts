import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager-app';
  isDarkMode = false;

 
ngOnInit() {
  if (typeof window !== 'undefined') {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }
}
 toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
  this.applyTheme();

  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}

applyTheme() {
  const body = document.body;
  this.isDarkMode? body.classList.add('dark-mode'): body.classList.remove('dark-mode');
}

}
