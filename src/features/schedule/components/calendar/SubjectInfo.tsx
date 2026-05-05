import { getShortTeacherName, getTypeShort } from "@/shared/helpers/subjectHelpers";
import { ISubject } from "@/shared/types/subject.model";
import { RemainingTimeBadge } from "../RemainingTimeBadge";

export function SubjectInfo({ subjects }: { subjects?: ISubject[] }) {
  const baseSubject = subjects && subjects[0];

  if (!subjects || !baseSubject) {
    return null;
  }

  return (
    <div>
      <div className="max-w-10">
        <RemainingTimeBadge subjects={subjects} />
      </div>
      <div className="font-bold">
        {getTypeShort(baseSubject.type_of_classes)}. {baseSubject.name}
      </div>

      {baseSubject.teacher && (
        <div className="flex items-center gap-1">
          <div>Преподаватель: </div>

          <div className="font-bold">
            {getShortTeacherName(baseSubject.teacher)}
          </div>
        </div>
      )}

      {baseSubject.audience && baseSubject.audience.name.length ? (
        <div className="flex items-center gap-1">
          <div>Аудитория: </div>
          <div className="font-bold">{baseSubject.audience.name}</div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex items-start gap-1">
        <div>Группы: </div>
        <div className="font-bold">
          <span>
            {subjects.length > 1
              ? `${subjects.map((s) => s.group.name).join(", ")}`
              : subjects[0].group.name}
          </span>
          {baseSubject.subgroup && (
            <span>
              {baseSubject.type_of_classes !== "Лекция" &&
                baseSubject.subgroup !== 3 &&
                ` (${baseSubject.subgroup} подгруппа)`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
