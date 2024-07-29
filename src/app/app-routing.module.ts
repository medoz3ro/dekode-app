import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserInputComponent } from './user-input/user-input.component'; // Updated import
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-input', component: UserInputComponent }, // Updated path and component
  { path: 'about-me', component: AboutMeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
