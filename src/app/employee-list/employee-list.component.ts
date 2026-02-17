import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Employee } from '../models/employee.model';
import { Organization } from '../models/organization.model';
import { EmployeeStore } from '../store/employee.store';
import { DepartmentStore } from '../store/department.store';
import { ORGANIZATIONS } from '../api/mock-data';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    EmployeeCardComponent,
  ],
  providers: [EmployeeStore], // #Бонус
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  organizations: Organization[] = ORGANIZATIONS;
  selectedOrganization: Organization = this.organizations[0];
  searchQuery = '';
  cardVisible = false;
  selectedEmployeeId: number | null = null;

  constructor(
    public store: EmployeeStore,
    private departmentStore: DepartmentStore,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  // #C
  ngOnInit(): void {
    this.loadEmployees();
    this.departmentStore.load(this.selectedOrganization.id);

    // #I same click triggers navigate -> queryParams -> openCard, and we also call openCard below
    this.route.queryParams.subscribe(params => {
      const employeeId = params['employeeId'];
      if (employeeId && employeeId !== 'new') {
        this.openCard(+employeeId);
      } else if (employeeId === 'new') {
        this.openNewCard();
      }
    });
  }

  loadEmployees(): void {
    this.store.loadList(
      this.selectedOrganization.id,
      this.store.page,
      this.store.pageSize,
      this.searchQuery || undefined,
    );
  }

  onOrganizationChange(): void {
    this.store.page = 0;
    this.departmentStore.load(this.selectedOrganization.id); // #F
    this.loadEmployees();
  }

  onSearch(): void {
    this.store.page = 0;
    this.loadEmployees();
  }

  onPageChange(event: any): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.store.pageSize;
    this.store.page = Math.floor(first / rows);
    this.store.pageSize = rows;
    this.loadEmployees();
  }

  // #I
  onRowClick(employee: Employee): void {
    this.router.navigate([], {
      queryParams: { employeeId: employee.id },
      queryParamsHandling: 'merge',
    });
    this.openCard(employee.id);
  }

  openCard(id: number): void {
    this.selectedEmployeeId = id;
    this.store.loadEmployee(id); // #A
    this.cardVisible = true;
  }

  openNewCard(): void {
    this.selectedEmployeeId = null;
    this.store.currentEmployee = null;
    this.cardVisible = true;
  }

  // #B #G
  onCardClosed(clearUrl: boolean): void {
    this.cardVisible = false;
    this.store.closeCard();

    if (clearUrl) {
      this.router.navigate([], {
        queryParams: { employeeId: null },
        queryParamsHandling: 'merge',
      });
    }

    this.loadEmployees();
  }

  onCardSaved(): void {
    this.onCardClosed(true);
  }

  // #E
  cellContent(employee: Employee): SafeHtml {
    const html = `<strong>${employee.fullName}</strong><br><span class="text-secondary">${employee.position}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getDepartmentName(departmentId: number): string {
    const dept = this.departmentStore.departments.find(d => d.id === departmentId);
    return dept ? dept.name : '—';
  }
}
