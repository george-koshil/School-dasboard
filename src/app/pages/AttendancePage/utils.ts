import { RateItemType } from "../../services/students-service/types";

export const getMissingMark = (
  studentId: number,
  studentRateData: RateItemType[]
) =>
  (
    studentRateData.find(
      (studentRate) => studentRate.SchoolboyId === studentId
    ) as RateItemType | undefined
  )?.Title ?? "";

export const haveMissingSign = (
  studetnId: number,
  rateData: RateItemType[]
) => {
  return rateData.find((rate) => rate.SchoolboyId === studetnId)?.Title;
};
