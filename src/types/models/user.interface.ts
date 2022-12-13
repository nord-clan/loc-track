import type { IDepartment } from '#/models/department.interface';
import type { IRole } from '#/models/role.interface';

export interface IVacationUser {
  availableVacationDaysNow: number;
  availableVacationDaysEndYear: number;
  usedDaysVacationNow: number;
  usedDaysVacationThisYear: number;
}

export interface IUserSkill {
  id: number;
  name: string;
  level: string;
}

export interface IUserSkillGroup {
  id: number;
  name: string;
  isActive: boolean;
  userSkills: IUserSkill[];
}

export interface IChief {
  id: string | number;
  name: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  chiefs: IChief[];
  city: string;
  departments: IDepartment[];
  employmentDate: string;
  login: string;
  mobile: string;
  telegramUserName: string;
}

export interface IUser {
  skills: IUserSkillGroup[];
  city: string;
  employmentDate: string;
  dismissalDate: string;
  departments: IDepartment[];
  id: number;
  login: string;
  vacationUser: IVacationUser;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  telegramUserName?: string;
  mobile?: string;
  chiefs: IChief[];
  chiefsIds: number[];
  departmentsIds: number[];
  role?: IRole;
  personalMail?: string;
}
