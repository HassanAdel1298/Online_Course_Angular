import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {



  private jwt_url = 'http://localhost:48190/api/Account';

 


  constructor(private myclient: HttpClient ,private router: Router) { }

 



////////////
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.myclient.post(this.jwt_url+'/login', credentials);
  }

  

  
// //////////////////////////////////////////////////
 
  // register(userDetails: any): Observable<any> {
  //   return this.myclient.post<any>(this.jwt_url + '/register', userDetails);
  // }


  register(userDetails: any) {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // return this.myclient.post(this.jwt_url + '/register', userDetails, { headers }).pipe(
    //   catchError(this.handleError)
    // );

    return this.myclient.post(this.jwt_url + '/register', userDetails);
  }

  
  
  private handleError(error: any) {
    let errorMessage = ' error while processing request';
    if (error.error instanceof ErrorEvent) {
      
      let errorMessage = 'Error: ' + error.error.message;

   
    } else if (error.status === 200 && error.error && error.error.message) {
     
      errorMessage = error.error.message;
    } else {
   
      
      let errorMessage = 'Error Code: ' + error.status + '\n Message: ' + error.message;

    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


// //////////


}
