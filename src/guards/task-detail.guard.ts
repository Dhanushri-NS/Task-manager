import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TaskService } from '../app/task.service';

export const taskDetailGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = Number(route.paramMap.get('id'));

  const taskService = inject(TaskService);
  const router = inject(Router);

  const task = taskService.getTaskByIndex(id);

  if(task){
    
    alert('Your task is there!!!');
    return true;
  }
  else{
  alert('Not Found')
    router.navigate(['/']);
    return false;
  }  
};


