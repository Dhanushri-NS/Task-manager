import { Routes } from '@angular/router';
import { TaskBoardComponent } from './task-board/task-board.component';
import { AboutComponent } from './about/about.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import { taskDetailGuard } from '../guards/task-detail.guard';
export const routes: Routes = [
    {path : '' , component:TaskBoardComponent},
    { path: 'task/:id', component: TaskdetailComponent ,canActivate: [taskDetailGuard]},
    {path :'about' , component:AboutComponent}
];
