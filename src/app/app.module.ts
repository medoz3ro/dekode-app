import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list'; // Import MatGridListModule
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CrudComponent } from './crud/crud.component'; // CRUD Component
import { AboutMeComponent } from './about-me/about-me.component'; // AboutMe Component
import { AppRoutingModule } from './app-routing.module';
import { CloseDropdownDirective } from './close-dropdown.directive';
import { AddEmployeeComponent } from './employee-CRUD/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee-CRUD/edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './employee-CRUD/view-employee/view-employee.component'; // Import CloseDropdownDirective

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CrudComponent,
    AboutMeComponent,
    CloseDropdownDirective,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent // Declare CloseDropdownDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule, // Add MatGridListModule here
    MatCardModule, // Add MatCardModule here
    HttpClientModule, // Import HttpClientModule here
    AppRoutingModule // Import the routing module here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
