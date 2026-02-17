import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { DepartmentApiService } from '../api/department-api.service';

@Injectable({ providedIn: 'root' })
export class DepartmentStore {
  departments: Department[] = [];
  loaded = false; // #F

  constructor(private api: DepartmentApiService) {}

  // #F
  load(organizationId: number): void {
    if (this.loaded) {
      return;
    }

    this.api.getByOrganization(organizationId).subscribe(departments => {
      this.departments = departments;
      this.loaded = true;
    });
  }
}
