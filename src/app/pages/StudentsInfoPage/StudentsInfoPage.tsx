import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQuery } from "react-query";
import { Button } from "@mui/material";
import StudentsService from "../../services/students-service/students.service";
import PageHeader from "../../components/PageHeader/PageHeader";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Student } from "../../services/students-service/types";
import React from "react";
import EditStudentDialog from "./components/EditStudentDialog";

const StudentInfoPage = () => {
  const studentsRes = useQuery("students", StudentsService.getStudents);
  const addNewStudentMutation = useMutation(StudentsService.addStudent, {
    onSuccess: () => studentsRes.refetch(),
  });
  const editStudentMutation = useMutation(StudentsService.editStudent, {
    onSuccess: () => studentsRes.refetch(),
  });
  const deleteStudentMutation = useMutation(StudentsService.deleteStudent, {
    onSuccess: () => studentsRes.refetch(),
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<"new" | "edit">("new");
  const [selectedStudentData, setSelectedStudentData] =
    React.useState<Student>();

  const openNewStudentDialog = () => {
    setOpenDialog(true);
    setDialogType("new");
  };

  const openEditTeacherDialog = (id: string) => {
    setOpenDialog(true);
    setDialogType("edit");
    setSelectedStudentData(studentsRes.data?.find((item) => item._id === id));
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudentData(undefined);
  };

  const onSave = (data: Student) => {
    if (dialogType === "new") addNewStudentMutation.mutate(data);
    else editStudentMutation.mutate({ ...data, _id: selectedStudentData?._id });

    setSelectedStudentData(undefined);
    setOpenDialog(false);
  };

  const onDeleteTeacher = (id: string) => {
    deleteStudentMutation.mutate(id);
  };

  return (
    <Box>
      <PageHeader name="Інформація про учнів">
        <Button variant="contained" onClick={openNewStudentDialog}>
          Додати учня
        </Button>
      </PageHeader>
      <TableContainer component={Paper} sx={{ mt: "20px", maxHeight: 'calc(100vh - 190px)' }}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">№</TableCell>
              <TableCell align="center">Ім'я</TableCell>
              <TableCell align="center">Вік</TableCell>
              <TableCell align="center">Стать</TableCell>
              <TableCell align="center">Клас</TableCell>
              <TableCell align="center">Хоббі</TableCell>
              <TableCell align="center">Редагування</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(studentsRes?.data ?? []).map((student, idx) => (
              <TableRow key={student._id}>
                <TableCell align="left">{idx + 1}</TableCell>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
                <TableCell align="center">{student.gender}</TableCell>
                <TableCell align="center">{student.grade}</TableCell>
                <TableCell align="center">{student.hobby}</TableCell>
                <TableCell align="center" sx={{ maxWidth: "90px" }}>
                  <Button
                    variant="contained"
                    onClick={() => openEditTeacherDialog(student._id as string)}
                    sx={{ mr: "10px" }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onDeleteTeacher(student._id as string)}
                  >
                    <ClearIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditStudentDialog
        open={openDialog}
        type={dialogType}
        onClose={onCloseDialog}
        onSave={onSave}
        initialData={selectedStudentData}
      />
    </Box>
  );
};

export default StudentInfoPage;
