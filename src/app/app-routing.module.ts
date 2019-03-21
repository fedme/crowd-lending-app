import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:id', component: ProjectComponent }
  // {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
