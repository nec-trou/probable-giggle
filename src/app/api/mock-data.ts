import { Organization } from '../models/organization.model';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';

export const ORGANIZATIONS: Organization[] = [
  { id: 1, name: 'Орг 1' },
  { id: 2, name: 'Орг 2' },
  { id: 3, name: 'Орг 3' },
];

export const DEPARTMENTS: Department[] = [
  { id: 1, name: 'Разработка', organizationId: 1 },
  { id: 2, name: 'Продукт', organizationId: 1 },
  { id: 3, name: 'Поддержка', organizationId: 2 },
  { id: 4, name: 'Маркетинг', organizationId: 2 },
  { id: 5, name: 'Аналитика', organizationId: 3 },
  { id: 6, name: 'Финансы', organizationId: 3 },
];

export const EMPLOYEES: Employee[] = [
  { id: 1, fullName: 'Иванов Иван Иванович', position: 'Frontend-разработчик', departmentId: 1, organizationId: 1 },
  { id: 2, fullName: 'Петрова Анна Сергеевна', position: 'Backend-разработчик', departmentId: 1, organizationId: 1 },
  { id: 3, fullName: 'Сидоров Пётр Алексеевич', position: 'Продакт-менеджер', departmentId: 2, organizationId: 1 },
  { id: 4, fullName: 'Козлова Мария Дмитриевна', position: 'UX-дизайнер', departmentId: 2, organizationId: 1 },
  { id: 5, fullName: 'Новиков Алексей Викторович', position: 'Тимлид', departmentId: 1, organizationId: 1 },
  { id: 6, fullName: 'Фёдорова Елена Олеговна', position: 'Специалист поддержки', departmentId: 3, organizationId: 2 },
  { id: 7, fullName: 'Морозов Дмитрий Андреевич', position: 'Старший специалист', departmentId: 3, organizationId: 2 },
  { id: 8, fullName: 'Волкова Ольга Николаевна', position: 'Маркетолог', departmentId: 4, organizationId: 2 },
  { id: 9, fullName: 'Соколов Артём Игоревич', position: 'SMM-менеджер', departmentId: 4, organizationId: 2 },
  { id: 10, fullName: 'Лебедева Татьяна Павловна', position: 'Руководитель поддержки', departmentId: 3, organizationId: 2 },
  { id: 11, fullName: 'Кузнецов Виктор Романович', position: 'Аналитик данных', departmentId: 5, organizationId: 3 },
  { id: 12, fullName: 'Попова Наталья Владимировна', position: 'Финансовый аналитик', departmentId: 6, organizationId: 3 },
  { id: 13, fullName: 'Васильев Роман Сергеевич', position: 'Бизнес-аналитик', departmentId: 5, organizationId: 3 },
  { id: 14, fullName: 'Николаева Дарья Александровна', position: 'Бухгалтер', departmentId: 6, organizationId: 3 },
];
