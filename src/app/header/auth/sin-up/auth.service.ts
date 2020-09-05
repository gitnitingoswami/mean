import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token;
  constructor( private http:HttpClient) {


  
   }
   getoken(){
    console.log("method"+this.token);
     return this.token;
     
   }
   creaeuser(email:string,password:string){
     console.log("service"+email+password);
     const authdata :AuthData={
      email:email,password:password
     }
     
     this.http.post('http://localhost:3000/api/user/singUp',authdata).subscribe((result)=>{
       console.log(result);
     })
   }

   loginuser(email:string,password:string){
     console.log("login"+email+password)
     const logindata={
       email:email,
       password:password,
     }
     this.http.post<{token:string,message:string}>('http://localhost:3000/api/user/login',logindata).subscribe((login)=>{
       const token =login.token;
       console.log(token);
       sessionStorage.setItem("token",token);
       

 
       
     })
    }
    
  
}
