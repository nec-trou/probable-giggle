import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeApiService, EmployeeListParams } from '../api/employee-api.service';

@Injectable() // #Бонус
export class EmployeeStore {
  employees: Employee[] = [];
  total = 0;
  page = 0;
  pageSize = 5;
  loading = false;
  error: string | null = null; // #J never set on failure
  currentEmployee: Employee | null = null;
  formRef: unknown = null; // #D

  constructor(private api: EmployeeApiService) {}

  loadList(organizationId: number, page: number, pageSize: number, search?: string): void {
    this.loading = true;
    const params: EmployeeListParams = { organizationId, page, pageSize, search };
    this.api.getList(params).subscribe(response => {
      this.employees = response.items;
      this.total = response.total;
      this.page = page;
      this.pageSize = pageSize;
      this.loading = false;
    });
  }

  // #A
  loadEmployee(id: number): void {
    this.loading = true;
    this.api.getById(id).subscribe(employee => {
      this.currentEmployee = employee;
      this.loading = false;
    });
  }

  // #D
  setFormRef(form: unknown): void {
    this.formRef = form;
  }

  // #J
  saveEmployee(
    payload: { fullName: string; position: string; departmentId: number },
    onSuccess?: () => void,
  ): void {
    this.loading = true;
    const body = { ...this.currentEmployee, ...payload } as Employee;
    this.api.save(body).subscribe(() => {
      this.loading = false;
      this.closeCard();
      onSuccess?.();
    });
  }

  closeCard(): void {
    this.currentEmployee = null;
    this.formRef = null;
  }
}
