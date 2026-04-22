import { BookText, CircleQuestionMark, FlaskConical, Pen } from "lucide-react";

export const getTypeIcon = (type: string, size: number = 20) => {
  const iconProps = { size };

  switch (type.toLowerCase()) {
    case "лекция":
      return <BookText {...iconProps} />;

    case "практическое занятие":
      return <Pen {...iconProps} />;

    case "лабораторное занятие":
      return <FlaskConical {...iconProps} />;

    default:
      return <CircleQuestionMark {...iconProps} />;
  }
};
