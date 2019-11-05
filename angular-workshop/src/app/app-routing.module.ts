import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AuthorComponent } from './views/author/author.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'authors/:name', component:AuthorComponent, data:{authorname:":name"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
