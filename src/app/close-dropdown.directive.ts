
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCloseDropdown]'
})
export class CloseDropdownDirective {

  constructor(private el: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(target: any): void {
    const insideDropdown = this.el.nativeElement.contains(target);
    if (!insideDropdown) {
      const dropdownContent = this.el.nativeElement.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.classList.remove('show');
      }
    }
  }
}
