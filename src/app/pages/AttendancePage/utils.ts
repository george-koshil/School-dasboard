import { Skipping } from "../../services/skipping-service/types";

export const getSkippingByIds = (
  studentId: string,
  lessonId: string,
  skippingsData?: Skipping[]
) => {
  return (skippingsData ?? []).find(
    (skipping) =>
      skipping.studentId === studentId && skipping.lessonId === lessonId
  );
};