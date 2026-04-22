import { ITeacher } from "@/shared/types/subject.model";
import { getShortTeacherName } from "./subjectHelpers";

export function getTeachersOptions(teachers: ITeacher[] | undefined) {
  return (
    teachers?.map((teacher) => ({
      value: `${teacher.last_name}`,
      label: `${getShortTeacherName(teacher)}`,
    })) || []
  );
}
