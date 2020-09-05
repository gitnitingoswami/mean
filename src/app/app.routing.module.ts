
import { NgModule, Component } from '@angular/core';

import {RouterModule, Routes} from '@angular/router'
import { PostListComponent } from './posts/post-list.component';
import { PostCreateComponent } from './posts/post-create.component';
import { SinInComponent } from './header/auth/sin-in/sin-in.component';
import { SinUpComponent } from './header/auth/sin-up/sin-up.component';
import { PraticeComponent } from './pratice/pratice.component';

const routes:Routes=[
    {
        path:'',
        component:PostListComponent
    },
    {
        path:'create',
        component:PostCreateComponent
    },
    {
        path:'edit/:id',
        component:PostCreateComponent
    },
    {
    path:'header/sinip',
    component: SinInComponent
},
{
    path:'header/sinup',
    component:SinUpComponent
},
{
    path:'pratice',
    component:PraticeComponent
}

]

@NgModule({
   imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})

export class AppRoutingModule{

}