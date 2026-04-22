export type TypeOfWeek = "numerator" | "denominator";

export interface ITimeSlot {
  start_time: string;
  end_time: string;
}

export interface IAudience {
  id: number;
  name: string;
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
