import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EmployeeStore } from '../store/employee.store';
import { DepartmentStore } from '../store/department.store';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DrawerModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [EmployeeStore], // #Бонус
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss',
})
export class EmployeeCardComponent implements OnInit {
  @Input() visible = false;
  @Input() employeeId: number | null = null;
  @Input() organizationId!: number;
  @Output() closed = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public store: EmployeeStore,
    public departmentStore: DepartmentStore,
  ) {}

  // #C
  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      departmentId: [null, Validators.required],
    });

    this.store.setFormRef(this.form); // #D

    this.form.valueChanges.subscribe(() => {
    });

    if (this.employeeId) {
      this.store.loadEmployee(this.employeeId);
      this.patchFormWhenLoaded();
    }

    this.departmentStore.load(this.organizationId);
  }

  // #H
  private patchFormWhenLoaded(): void {
    const interval = setInterval(() => {
      if (this.store.currentEmployee) {
        this.form.patchValue({
          fullName: this.store.currentEmployee.fullName,
          position: this.store.currentEmployee.position,
          departmentId: this.store.currentEmployee.departmentId,
        });
        clearInterval(interval);
      }
    }, 50);
  }

  onSave(): void {
    if (this.form.valid) {
      this.store.saveEmployee(this.form.value, () => this.saved.emit());
    }
  }

  // #B
  doClose(): void {
    this.closed.emit(true);
  }

  // #G
  onDrawerHide(): void {
    this.closed.emit(false);
  }
}
