import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrudComponent } from './crud/crud.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route to HomeComponent
  { path: 'crud', component: CrudComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: '**', redirectTo: '' }  // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
