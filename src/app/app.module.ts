import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

//angular material
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import{MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatPaginatorModule} from '@angular/material/paginator';

//compoents
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create.component';
import { PostListComponent } from './posts/post-list.component';
import { SinInComponent } from './header/auth/sin-in/sin-in.component';
import { SinUpComponent } from './header/auth/sin-up/sin-up.component';

//services
import { PostService } from './posts/post.service';
import { PraticeComponent } from './pratice/pratice.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    SinInComponent,
    SinUpComponent,
    PraticeComponent
    
  ],
  imports: [

  BrowserModule,
   FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatPaginatorModule,
MatToolbarModule,
MatProgressSpinnerModule,
HttpClientModule



    
  ],
  providers: [
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
