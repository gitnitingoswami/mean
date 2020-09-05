import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import{HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { AuthService } from './../header/auth/sin-up/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private token;
  private authReq;
private  posts:Post[]=[];
private postsUpdated=new Subject<{Post: Post[],postcout:number}>();
 public maxpost;
getPost(pagesize:number,page:number){
  const queryParams =`?pagesize=${pagesize}&page=${page}`
 this.http.get<{message:string;posts:Post[];maxpost:number}>('http://localhost:3000/api/backend'+queryParams)
 .subscribe((postData)=>{
   this.posts=postData.posts;

 
   this.postsUpdated.next({Post:[...this.posts],postcout:postData.maxpost});
 
  

  


 });
 

}

getupdatepost(){
 return this.postsUpdated.asObservable();
 
}
addPost(title:string,content:string,image:File){
  const postData =new FormData();
  postData.append('title',title),
  postData.append('content',content),
  postData.append('image',image ),
 
  this.http.post<{message:string;post:Post}>('http://localhost:3000/api/backend',
  postData,).subscribe((postReposece)=>{
  
  this.router.navigate(["/"]);});

}
edit(id){
  
  return {...this.posts.find((aid)=>id===aid._id)};
}
delete(id){
  console.log(this.authReq);
 return this.http.delete('http://localhost:3000/api/backend/'+id,this.authReq).subscribe(()=>{

 console.log(this.authReq);
  })

}
updatePost(id:string,title:string,content:string,imagePath: string | File){
  let postupdate:Post |FormData;
  if(typeof (imagePath)=='object'){
     postupdate = new FormData();
     postupdate.append("_id",id),
    postupdate.append("title", title),
    postupdate.append("content",content),
    postupdate.append("image",imagePath),
      
  
console.log("image editing"); 
  }
  else {
     postupdate={
      _id:id,
      title:title,
      content:content,
      imagePath:imagePath
    };
  }
 

  this.http.put<{message:string}>('http://localhost:3000/api/backend/'+id,postupdate,this.authReq).subscribe(response=>console.log(response));
  this.router.navigate(["/"]);

 console.log(this.authReq);

}


  constructor(private http:HttpClient,private router:Router,private auth:AuthService) { 
  const authToken= sessionStorage.getItem("token");
  console.log("post service  "+authToken);
this.authReq={
    headers:{"Authorization":"Bearar "+authToken}
  }
  console.log(this.authReq);
  }
}
