import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: any) {
    const insideDropdown = document.querySelector('.dropdown')?.contains(target);
    if (!insideDropdown) {
      this.dropdownOpen = false;
    }
  }
}
