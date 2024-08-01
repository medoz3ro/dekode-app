import { Component, OnInit, HostListener } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  pagedEmployees: any[] = [];
  searchText: string = '';
  selectedJobTitle: string = '';
  jobTitles: string[] = [];
  navbarDropdownOpen: boolean = false;
  filterDropdownOpen: boolean = false;
  sortDropdownOpen: boolean = false;
  gridCols: number = 2; // Default number of columns
  sortBy: string = '';
  
  // Pagination properties
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.setJobTitles(data);
        this.updateGridCols(window.innerWidth); // Set initial grid columns based on screen width
        this.updatePagedEmployees();
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
    let filtered = this.employees
      .filter(emp => this.selectedJobTitle ? emp.jobTitle === this.selectedJobTitle : true)
      .filter(emp => this.searchText ? `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(this.searchText.toLowerCase()) : true);

    this.sortFilteredEmployees(filtered);
    this.filteredEmployees = filtered;
    this.currentPage = 0; // Reset to the first page
    this.updatePagedEmployees();
  }

  sortFilteredEmployees(employees: any[]): void {
    employees.sort((a, b) => {
      const valueA = a[this.sortBy]?.toLowerCase() || '';
      const valueB = b[this.sortBy]?.toLowerCase() || '';
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
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

  sortEmployees(criteria: string): void {
    this.sortBy = criteria;
    this.filterEmployees();
    this.closeSortDropdown();
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

  toggleSortDropdown(): void {
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }

  closeSortDropdown(): void {
    this.sortDropdownOpen = false;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedEmployees();
  }

  updatePagedEmployees(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateGridCols((event.target as Window).innerWidth);
  }

  private updateGridCols(width: number): void {
    this.gridCols = width < 600 ? 1 : 2; // Single column for mobile devices, 2 columns for larger screens
  }
}
