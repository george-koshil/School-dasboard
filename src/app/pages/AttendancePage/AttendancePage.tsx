import {
  RateItemType,
} from "../../../app/services/students-service/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  filterStudents,
  selectStudents,
  setGrade,
  setSearchValue,
} from "../../slices/studentsSlice/studentsSlice";
import { haveMissingSign } from "./utils";
import StudentsAttendanceTable from "./components/Table/Table";
import { Box, CircularProgress } from "@mui/material";
import GradePiker from "./components/Filters/GradePicker";
import SearchFilter from "./components/Filters/SearchFilter";
import { useFetchAndSaveData, usePrepareMutations, useRefetchByGrade } from "./hooks";

function AttendancePage() {
  const students = useAppSelector(selectStudents);
  const dispatch = useAppDispatch();

  const { classesData, studentRateData, studentsData, isLoading} = useFetchAndSaveData()

  const { pinAsMissingMutation, unpinAsMissingMutation } = usePrepareMutations(studentRateData, classesData, students.grade)

  useRefetchByGrade(studentsData)

  const handleClickOnCell = (
    studentId: number,
    classId: number,
    rateData: RateItemType[]
  ) => {
    if (haveMissingSign(studentId, rateData)) {
      unpinAsMissingMutation.mutate({
        SchoolboyId: studentId,
        ColumnId: classId,
      });
    } else {
      pinAsMissingMutation.mutate({
        SchoolboyId: studentId,
        ColumnId: classId,
      });
    }
  };

  const handleSearch = (event: any) => {
    dispatch(setSearchValue({ value: event.target.value }));
    dispatch(filterStudents());
  };

  const handleSelectGrade = (grade: number) => {
    dispatch(setGrade({ grade }));
  };

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <div>
      <Box sx={{ display: "flex", padding: "20px" }}>
        <SearchFilter
          onChange={handleSearch}
          value={students.searchValue}
        />
        <GradePiker onSelect={handleSelectGrade} value={students.grade} />
      </Box>
      <StudentsAttendanceTable
        studentsData={
          students.searchValue.length > 0
            ? students.filteredStudents
            : students.items
        }
        studentRateData={students.rate}
        classesData={classesData.data?.Items ?? []}
        onCellClick={handleClickOnCell}
      />
    </div>
  );
}

export default AttendancePage;
