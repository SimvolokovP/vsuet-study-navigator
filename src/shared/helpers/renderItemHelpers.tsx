import { ISubject } from "@/shared/types/subject.model";
import { ReactNode } from "react";

export function renderWithSeparators(
  elements: (ReactNode | null)[]
): ReactNode[] {
  const validElements = elements.filter(Boolean);
  return validElements.map((element, index) => (
    <div key={index} className="flex items-center gap-1">
      {element}
      {index < validElements.length - 1 && <span>|</span>}
    </div>
  ));
}

export function getGroupNames(subjects: ISubject[]): string {
  return subjects.map((s) => s.group.name).join(", ");
}
