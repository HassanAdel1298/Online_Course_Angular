import { CanActivateFn, Router } from '@angular/router';

export const instructorGuard: CanActivateFn = (route, state) => {
  
  const router = new Router();
  var DataUser :any;
  DataUser = localStorage.getItem('DataUser');
  DataUser = JSON.parse(DataUser);
  console.log(DataUser)
  if(DataUser.roles == "Instructor")
  {
    return true;
  }
  else{
    router.navigate(['/Login']);
    return false;
  }
  
};
