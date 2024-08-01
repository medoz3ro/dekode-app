import { Component, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';
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
  filterDropdownOpen: boolean = false;
  sortDropdownOpen: boolean = false;
  pageSizeDropdownOpen: boolean = false;
  gridCols: number = 2;
  sortBy: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  sortDisabled: boolean = false;
  pageSizeDisabled: boolean = false;

  constructor(
    private employeeService: EmployeeService, 
    private renderer: Renderer2, 
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.setJobTitles(data);
        this.updateGridCols(window.innerWidth);
        this.updatePagedEmployees();
      },
      (error: any) => {
        console.error('Error fetching employee data:', error);
      }
    );

    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.closeAllDropdowns();
      }
    });
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
    this.currentPage = 0;
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
    if (!this.sortDisabled) {
      this.sortBy = criteria;
      this.sortDisabled = true;
      this.filterEmployees();
      this.closeSortDropdown();
    }
  }

  toggleFilterDropdown(event: Event): void {
    event.stopPropagation();
    this.filterDropdownOpen = !this.filterDropdownOpen;
    this.sortDropdownOpen = false;
    this.pageSizeDropdownOpen = false;
  }

  closeFilterDropdown(): void {
    this.filterDropdownOpen = false;
  }

  toggleSortDropdown(event: Event): void {
    event.stopPropagation();
    this.sortDropdownOpen = !this.sortDropdownOpen;
    this.filterDropdownOpen = false;
    this.pageSizeDropdownOpen = false;
  }

  closeSortDropdown(): void {
    this.sortDropdownOpen = false;
  }

  togglePageSizeDropdown(event: Event): void {
    event.stopPropagation();
    this.pageSizeDropdownOpen = !this.pageSizeDropdownOpen;
    this.filterDropdownOpen = false;
    this.sortDropdownOpen = false;
  }

  closePageSizeDropdown(): void {
    this.pageSizeDropdownOpen = false;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.updatePagedEmployees();
  }

  onPageSizeChange(size: number): void {
    if (!this.pageSizeDisabled) {
      this.pageSize = size;
      this.pageSizeDisabled = true;
      this.currentPage = 0;
      this.updatePagedEmployees();
      this.closePageSizeDropdown();
    }
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
    this.gridCols = width < 600 ? 1 : 2;
  }

  public closeAllDropdowns(): void {
    this.filterDropdownOpen = false;
    this.sortDropdownOpen = false;
    this.pageSizeDropdownOpen = false;
  }
}
