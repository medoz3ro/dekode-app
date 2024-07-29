import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  save(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
