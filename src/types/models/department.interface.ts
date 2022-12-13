export const departmentTypes = ['department', 'office', 'subdivision'] as const;
export type DepartmentType = typeof departmentTypes[number];

export interface IDepartment {
  id: string | number;
  name: string;
  type?: DepartmentType;
}

export interface IDepartments {
  [key: number]: string;
}

export const UsersDepartments: IDepartments = {
  1: '*Направление Frontend/JS',
  2: '*Направление мобильной разработки',
  3: '*Направление QA',
  4: '*Клиентская служба',
  5: '*Отдел продаж',
  6: '*Направление Backend',
  7: '*Направление ПМ и Аналитики',
  8: '*Топ менеджмент',
  9: '*Рекрутинг/HR',
  10: '*Администрация',
  11: '*Производство - Другое',
  12: '*Направление ML (Машинное обучение)',
  13: '*Направление QAA',
  14: '*Удаленный сотрудник',
  15: '*Офис Санкт-Петербург',
  16: '*Офис Ульяновск'
};

export const Departments: IDepartments = {
  1: 'frontend',
  2: 'mob_dev',
  3: 'qa',
  4: 'client',
  5: 'sales',
  6: 'backend',
  7: 'pm_analysts',
  8: 'management',
  9: 'hr',
  10: 'admin',
  11: 'production_other',
  12: 'ml',
  13: 'qaa',
  14: 'remote_employee',
  15: 'petersburg',
  16: 'ulyanovsk'
};
