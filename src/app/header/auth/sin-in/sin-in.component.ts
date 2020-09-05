import { Component, OnInit } from '@angular/core';
import { AuthService } from './../sin-up/auth.service';

@Component({
  selector: 'app-sin-in',
  templateUrl: './sin-in.component.html',
  styleUrls: ['./sin-in.component.css']
})
export class SinInComponent implements OnInit {
  isLoading=false;

  constructor(private auth:AuthService) { }
  onSubmit(form){
    console.log(form.value.Email);
    
this.auth.loginuser(form.value.Email,form.value.password);

  }

  ngOnInit(): void {
  }

}
