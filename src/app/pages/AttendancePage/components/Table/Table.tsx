import MaterialTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getFullName } from "../../../../utils/string";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import { StudentType, RateItemType } from "../../../../services/students-service/types";
import { getMissingMark } from "../../utils";
import { ClassType } from "../../../../services/classes-service/types";

type TableProps = {
  studentsData: StudentType[],
  studentRateData: RateItemType[],
  classesData: any,
  onCellClick: (
    studentId: number,
    classId: number,
    rateData: RateItemType[]
  ) => void
}

function Table(props: TableProps) {
  return (
      <TableContainer component={Paper} sx={{ padding: '20px' }}>
        <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell align="left">№</TableCell>
              <TableCell align="left">Учень</TableCell>
              {props.classesData.map((classItem: ClassType) => (
                <TableCell align="center" key={classItem.Id}>
                  {classItem.Title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.studentsData.map((student: StudentType, index: number) => (
              <TableRow key={student.Id}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">
                  {getFullName(
                    student.FirstName,
                    student.SecondName,
                    student.LastName
                  )}
                </TableCell>
                {props.classesData.map((classItem: ClassType) => (
                  <TableCell
                    sx={{
                      ":hover": {
                        opacity: 0.8,
                        background: "rgb(212, 211, 211)",
                        cursor: "pointer",
                      },
                    }}
                    align="center"
                    key={classItem.Id}
                    onClick={() => {
                      console.log(student.Id,
                        classItem.Id,
                        props.studentRateData, "id")
                      props.onCellClick(
                        student.Id,
                        classItem.Id,
                        props.studentRateData
                      )
                    }}
                  >
                    {getMissingMark(
                      student.Id,
                      props.studentRateData
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

        </MaterialTable>
      </TableContainer>
  );
}

export default Table;
