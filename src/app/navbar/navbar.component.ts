import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: any) {
    const insideDropdown = document.querySelector('.dropdown')?.contains(target);
    if (!insideDropdown) {
      this.closeDropdown();
    }
  }
}
