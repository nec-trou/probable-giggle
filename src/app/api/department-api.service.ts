import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Department } from '../models/department.model';
import { DEPARTMENTS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class DepartmentApiService {
  getByOrganization(organizationId: number): Observable<Department[]> {
    const departments = DEPARTMENTS.filter(d => d.organizationId === organizationId);
    return of(departments).pipe(delay(150));
  }
}
