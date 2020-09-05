import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import{Post} from './post.model'
import { PostService } from './post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy{
  posts:Post[]=[];
  subcribsion:Subscription;
  route:Router;
  isLoading=false;
totallenght=1;
  pagesize=2;
  currentpage=1;
  pageizeoptions=[1,2,5,7,9];

  constructor(public postService:PostService) {
   // this.posts =[
    //  {title:'first element',content:'all data of fires'},
    //  {title:'second element',content:'all data of sec'},
    //  {title:'thirsd element',content:'all data of third'},
   // ];
   
  

   }
   onChangePage(page:PageEvent){
    this.isLoading=true;

     this.currentpage =page.pageIndex+1;
     this.pagesize=page.pageSize;
   
     this.postService.getPost( this.pagesize,this.currentpage);


   }
   
   onDelete(id){
    this.isLoading=true;
     this.postService.delete(id);
     this.subcribsion= this.postService.getupdatepost().subscribe((postData:{Post:Post[];postcout:number})=>{
      this.posts=postData.Post;
      this.isLoading=false;
      this.totallenght=postData.postcout;
         })
   }


  ngOnInit() {
    this.isLoading=true;
 this.postService.getPost( this.pagesize,this.currentpage);
  this.subcribsion= this.postService.getupdatepost().subscribe((postData:{Post:Post[];postcout:number})=>{
this.posts=postData.Post;
this.isLoading=false;
this.totallenght=postData.postcout;
   })
  }
  ngOnDestroy(){
    this.subcribsion.unsubscribe();

  }

}
