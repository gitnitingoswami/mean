import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pratice',
  templateUrl: './pratice.component.html',
  styleUrls: ['./pratice.component.css']
})
export class PraticeComponent implements OnInit {
data=[]
  constructor() { }
save(abc:NgForm){
  console.log(abc);
  this.data.push(abc);
  console.log(abc);
}
  ngOnInit(): void {
  }

}
