import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { RateItemType, StudentType } from "../../services/students-service/types";
import { getFullName } from "../../utils/string";

type EnhancedStudentType = StudentType & { attendance?: boolean };

export type StudentsState = {
  items: EnhancedStudentType[];
  searchValue: string
  sortOrder: 'asc' | 'desc'
  grade: number
  rate: RateItemType[]
  filteredStudents: EnhancedStudentType[];
  allStudentsAmount: number,
  allMissedDaysAmount: number
};

const initialState: StudentsState = {
  items: [],
  searchValue: '',
  sortOrder: 'asc',
  grade: 1,
  rate: [],
  filteredStudents: [],
  allMissedDaysAmount: 0,
  allStudentsAmount: 0
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    saveStudents: (state, action: PayloadAction<StudentType[]>) => {
      state.items = action.payload;
    },
    pinAsMissing: (state, action: PayloadAction<{ Id: number }>) => {
      state.items = state.items.map((student) => {
        if (student.Id === action.payload.Id) {
          return { ...student, attendance: false };
        }

        return student;
      });
    },
    unpinAsMissing: (state, action: PayloadAction<{ Id: number }>) => {
      state.items = state.items.map((student) => {
        if (student.Id === action.payload.Id) {
          return { ...student, attendance: true };
        }

        return student;
      });
    },
    sortStudents: (state, action: PayloadAction<{ columnName: string }>) => {
      const transformedStudents: string[] = state.items.map(student => getFullName(student.FirstName, student.SecondName, student.LastName)).sort()
      transformedStudents.sort()
    },
    filterStudents: (state) => {
      if (state.searchValue.length === 0) {

      }

      state.filteredStudents = state.items.filter((student) =>
        getFullName(student.FirstName, student.SecondName, student.LastName)
          .toLocaleLowerCase()
          .includes(state.searchValue.toLocaleLowerCase())
      );
    },
    setGrade: (state, action: PayloadAction<{ grade: number }>) => {
      state.grade = action.payload.grade
    },
    saveRate: (state, action: PayloadAction<{ rate: RateItemType[] }>) => {
      state.rate = action.payload. rate
    },
    setSearchValue: (state, action: PayloadAction<{ value: string }>) => {
      state.searchValue = action.payload.value
    },
    setAllStudentsAmount: (state, action: PayloadAction<{ amount: number }>) => {
      state.allStudentsAmount = action.payload.amount
    },
    setAllMissedDaysAmount: (state, action: PayloadAction<{ amount: number }>) => {
      state.allStudentsAmount = action.payload.amount
    },
  },
});

export const { saveStudents, pinAsMissing, unpinAsMissing, sortStudents, filterStudents, setGrade, setSearchValue, saveRate } = studentsSlice.actions;

export const selectStudents = (state: RootState):StudentsState => state.students;

export default studentsSlice.reducer;
