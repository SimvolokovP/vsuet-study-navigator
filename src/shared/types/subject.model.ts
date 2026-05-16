export type TypeOfWeek = "numerator" | "denominator";

export interface ITimeSlot {
  start_time: string;
  end_time: string;
}

export interface IAudience {
  id: number;
  name: string;
  floor?: number;
}

interface ITimeSubject {
  number: number;
  start_time: string;
  end_time: string;
}

export interface ITeacher {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
}

export interface IGroup {
  id: number;
  name: string;
}

interface IRepeatDate {
  id: number;
  date: string;
}

export interface ISubject {
  id: number;
  name: string;
  audience?: IAudience;
  date: string;
  type_of_week: TypeOfWeek;
  type_of_classes: "Лекция" | "Практическое занятие" | "Лабораторное занятие";
  time_subject: ITimeSubject;
  teacher?: ITeacher;
  group: IGroup;
  subgroup: number;
  repeat_dates: IRepeatDate[];
}

export interface IFreeSlot {
  number: number;
  start_time: string;
  end_time: string;
}

export interface INearestAudience {
  audience: IBaseAudience;
  free_slots: IFreeSlot[];
}

export type AudiencesListResponse = IAudience[];

export type FreeAudienceSearchMode = "name" | "params";

export interface IFreeAudienceParams {
  datetime: string;
  audience?: string;
  floor?: number | string;
}

export interface IFreeSlot {
  number: number;
  start_time: string;
  end_time: string;
}

export interface IBaseAudience {
  id: number;
  name: string;
  floor: number;
}

export interface IFreeAudienceItem {
  audience: IBaseAudience;
  free_slots: IFreeSlot[];
}

export type FreeAudienceListResponse = IFreeAudienceItem[];

export interface IFreeAudienceDetailResponse {
  audience: IBaseAudience;
  free_slots: IFreeSlot[];
  nearest: INearestAudience[];
}

export interface IFreeAudiencePagedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IFreeAudienceItem[];
}