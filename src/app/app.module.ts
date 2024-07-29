import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar'; // Toolbar component
import { MatButtonModule } from '@angular/material/button'; // Button component
import { MatIconModule } from '@angular/material/icon'; // Icon component
import { MatMenuModule } from '@angular/material/menu'; // Menu component
import { MatGridListModule } from '@angular/material/grid-list'; // Grid list component
import { MatCardModule } from '@angular/material/card'; // Card component
import { MatInputModule } from '@angular/material/input'; // Input component
import { MatFormFieldModule } from '@angular/material/form-field'; // Form field component

// Angular Forms and HTTP
import { HttpClientModule } from '@angular/common/http'; // HTTP client for API calls
import { FormsModule } from '@angular/forms'; // For template-driven forms

// App Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { UserInputComponent } from './user-input/user-input.component';
import { CloseDropdownDirective } from './close-dropdown.directive';

// Routing Module
import { AppRoutingModule } from './app-routing.module';



import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutMeComponent,
    UserInputComponent,
    CloseDropdownDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
