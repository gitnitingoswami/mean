import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sin-up',
  templateUrl: './sin-up.component.html',
  styleUrls: ['./sin-up.component.css']
})
export class SinUpComponent implements OnInit {
isLoading=false;
  constructor(private auth:AuthService) { }
onSubmit(form:NgForm){
  //console.log(form.value.password);
 // console.log(form.value.name);
 console.log("triger");
  this.auth.creaeuser(form.value.email,form.value.password);
 
  
  
}
  ngOnInit(): void {
  }

}
