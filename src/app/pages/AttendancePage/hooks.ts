import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ClassesService from "../../services/classes-service/classes-service";
import StudentsService from "../../services/students-service/students.service";
import { PinAsMissedParamsType, RateItemType, UnpinAsMissedParamsType } from "../../services/students-service/types";
import { saveRate, saveStudents, selectStudents, StudentsState } from "../../slices/studentsSlice/studentsSlice";

export const useFetchAndSaveData = () => {
  const students = useAppSelector(selectStudents);
  const dispatch = useAppDispatch();
  
  const studentsData = useQuery(
    [StudentsService.fetchStudents.name],
    StudentsService.fetchStudents(students.grade)
  );

  const classesData = useQuery(
    [ClassesService.fetchClasses.name],
    ClassesService.fetchClasses(students.grade)
  );

  const studentRateData = useQuery(
    [StudentsService.fetchStudentRate.name],
    StudentsService.fetchStudentRate(students.grade)
  );
  

  // Save to redux
  useEffect(() => {
    if (studentsData.data?.Items && studentRateData.data?.Items) {
      dispatch(saveStudents(studentsData.data.Items));
      dispatch(saveRate({ rate:  studentRateData.data?.Items}))
    }
  }, [studentsData.data?.Items, studentRateData.data?.Items]);

  return { isLoading: studentRateData.isLoading || classesData.isLoading || studentsData.isLoading, studentRateData, studentsData, classesData }
}


export const usePrepareMutations = ( studentRateData: any, classesData: any, grade: number) => {
  const pinAsMissingMutation = useMutation(
    (params: PinAsMissedParamsType) => StudentsService.pinAsMissed(grade, params),
    {
      onSuccess: () => {
        studentRateData.refetch();
        classesData.refetch();
      },
    }
  );

  const unpinAsMissingMutation = useMutation(
    (params: UnpinAsMissedParamsType) =>
      StudentsService.unpinAsMissed(grade, params),
    {
      onSuccess: () => {
        studentRateData.refetch();
        classesData.refetch();
      },
    }
  );

  return { pinAsMissingMutation, unpinAsMissingMutation}
}


export const useRefetchByGrade = (studentsData: any) => {
  const students = useAppSelector(selectStudents);

  useEffect(() => {
    studentsData.refetch()
  }, [students.grade])
}