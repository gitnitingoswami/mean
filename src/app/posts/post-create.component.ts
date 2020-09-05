import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import{Post} from './post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { ActivatedRoute } from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
 
 data:string;
 post:Post;
 isLoading=false;
   form:FormGroup;
   imagepreview:string;

  constructor(public postService:PostService,
   private ActRoute:ActivatedRoute) {
  this. data=    this.ActRoute.snapshot.paramMap.get('id');
 
 }
   addpost(){

     if(this.form.invalid){
       return
     }
     if(this.data){
       console.log("editing");
      this.postService.updatePost(this.data,this.form.value.title,this.form.value.content,this.form.value.image);


     }else{
    this.postService.addPost(this.form.value.title,this.form.value.content,this.form.value.image);
   
 this.form.reset()}
  }
  onchange(event:Event){
  const files= (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image:files});
  this.form.get('image').updateValueAndValidity();
 

  const reader =new FileReader();
  reader.onload = ()=>{
 this.imagepreview =reader.result as string;}
  reader.readAsDataURL(files);
  }
 
  
  ngOnInit() {
   this.form = new FormGroup({
     title: new FormControl(null,{
       validators:[Validators.required,Validators.minLength(3)]
     }),
     content:new FormControl(null,{
       validators:[Validators.required]
     }),
     image:new FormControl(null,{validators:[Validators.required]})

   })
   if(this.data){
    this.isLoading=true;
    this.post=this.postService.edit(this.data);
    this.form.setValue({'title':this.post.title,
    'content':this.post.content,
  'image':this.post.imagePath,})};
    this.isLoading=false;
   
  }

}
