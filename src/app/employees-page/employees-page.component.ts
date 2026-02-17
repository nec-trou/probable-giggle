import { Component } from '@angular/core';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [EmployeeListComponent],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
})
export class EmployeesPageComponent {}
