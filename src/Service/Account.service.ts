import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  DataUser : any;

  constructor(private http: HttpClient) { }

  private DB_url="http://localhost:48190/api/Account/"; 
  
  AddNewUser(userdata: any){ 

    return this.http.post( this.DB_url + "register", userdata );

  }

  LoginUser(userdata: any){ 

    return this.http.post( this.DB_url + "login", userdata );
    
  }

  GetID(){ 

    
    if (localStorage.getItem('DataUser')) {
      this.DataUser = localStorage.getItem('DataUser');
      this.DataUser = JSON.parse(this.DataUser);
    }

    var getid:any = {
      username : this.DataUser.userName,
      role : this.DataUser.roles
    };

    console.log (getid);

    return this.http.post( this.DB_url + "GetID" , getid );
    
  }
  
}
