import { Component, OnInit, HostListener } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchText: string = '';
  selectedJobTitle: string = '';
  jobTitles: string[] = [];
  navbarDropdownOpen: boolean = false;
  filterDropdownOpen: boolean = false;
  gridCols: number = 2; // Default number of columns

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.setJobTitles(data);
        this.updateGridCols(window.innerWidth); // Set initial grid columns based on screen width
      },
      (error: any) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  setJobTitles(employees: any[]): void {
    this.jobTitles = [...new Set(employees.map(emp => emp.jobTitle))];
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees
      .filter(emp => this.selectedJobTitle ? emp.jobTitle === this.selectedJobTitle : true)
      .filter(emp => this.searchText ? `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(this.searchText.toLowerCase()) : true);
  }

  onSearchTextChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.filterEmployees();
  }

  onJobTitleChange(jobTitle: string): void {
    this.selectedJobTitle = jobTitle;
    this.filterEmployees();
    this.closeFilterDropdown();
  }

  toggleNavbarDropdown(): void {
    this.navbarDropdownOpen = !this.navbarDropdownOpen;
  }

  closeNavbarDropdown(): void {
    this.navbarDropdownOpen = false;
  }

  toggleFilterDropdown(): void {
    this.filterDropdownOpen = !this.filterDropdownOpen;
  }

  closeFilterDropdown(): void {
    this.filterDropdownOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateGridCols((event.target as Window).innerWidth);
  }

  private updateGridCols(width: number): void {
    this.gridCols = width < 600 ? 1 : 2; // Single column for mobile devices, 2 columns for larger screens
  }
}
