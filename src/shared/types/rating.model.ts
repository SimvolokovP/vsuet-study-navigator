export type TypeOfWeek = "numerator" | "denominator";

export interface IRatingItem {
  subjectName: string;
  ratingGrades: [number, number, number, number, number];
}
