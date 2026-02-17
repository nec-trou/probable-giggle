import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { EMPLOYEES } from './mock-data';

export interface EmployeeListParams {
  organizationId: number;
  page: number;
  pageSize: number;
  search?: string;
}

export interface EmployeeListResponse {
  items: Employee[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  getList(params: EmployeeListParams): Observable<EmployeeListResponse> {
    let filtered = EMPLOYEES.filter(e => e.organizationId === params.organizationId);

    if (params.search) {
      const term = params.search.toLowerCase();
      filtered = filtered.filter(
        e => e.fullName.toLowerCase().includes(term) || e.position.toLowerCase().includes(term),
      );
    }

    const total = filtered.length;
    const start = params.page * params.pageSize;
    const items = filtered.slice(start, start + params.pageSize);

    return of({ items, total }).pipe(delay(200));
  }

  // #A
  // #K
  getById(id: number): Observable<Employee> {
    const employee = EMPLOYEES.find(e => e.id === id);
    const randomDelay = 80 + Math.random() * 400;
    return of(employee!).pipe(delay(randomDelay));
  }

  // #J
  save(employee: Partial<Employee>): Observable<Employee> {
    const randomFail = Math.random() > 0.5;
    if (randomFail) {
      return throwError(() => new Error('Save failed')).pipe(delay(300));
    }
    const saved = { ...EMPLOYEES.find(e => e.id === employee.id), ...employee } as Employee;
    return of(saved).pipe(delay(300));
  }
}
