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
import TeachersService from "../../services/teachers-service/teachers.service";
import PageHeader from "../../components/PageHeader/PageHeader";
import React from "react";
import EditTeacherDialog from "./components/EditTeacherDialog";
import { Teacher } from "../../services/teachers-service/types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from '@mui/material/CircularProgress';

const TeachersInfoPage = () => {
  const teachersRes = useQuery("teachers", TeachersService.getTeachers);
  const addNewTeacherMutation = useMutation(TeachersService.addTeacher, {
    onSuccess: () => teachersRes.refetch(),
  });
  const editTeacherMutation = useMutation(TeachersService.editTeacher, {
    onSuccess: () => teachersRes.refetch(),
  });
  const deleteTeacherMutation = useMutation(TeachersService.deleteTeacher, {
    onSuccess: () => teachersRes.refetch(),
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<"new" | "edit">("new");
  const [selectedTeacherData, setSelectedTeacherData] =
    React.useState<Teacher>();

  const openNewTeacherDialog = () => {
    setOpenDialog(true);
    setDialogType("new");
  };

  const openEditTeacherDialog = (id: string) => {
    setOpenDialog(true);
    setDialogType("edit");
    setSelectedTeacherData(teachersRes.data?.find((item) => item._id === id));
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeacherData(undefined);
  };

  const onSave = (data: Teacher) => {
    if (dialogType === "new") addNewTeacherMutation.mutate(data);
    else editTeacherMutation.mutate({ ...data, _id: selectedTeacherData?._id });

    setOpenDialog(false);
  };

  const onDeleteTeacher = (id: string) => {
    deleteTeacherMutation.mutate(id);
  };

  if (teachersRes.isLoading) {
    return <CircularProgress size={100} sx={{ display: 'block', margin: 'auto'}} />
  }

  return (
    <Box>
      <PageHeader name="Інформація про вчителів">
        <Button variant="contained" onClick={openNewTeacherDialog}>
          <AddIcon /> Add teacher
        </Button>
      </PageHeader>
      <TableContainer
        component={Paper}
        sx={{ mt: "20px", maxHeight: 'calc(100vh - 190px)' }}
      >
        <Table
          aria-label="simple table"
          stickyHeader
          sx={{ mt: "20px", maxWidth: "100vh - 64px - 20px" }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">№</TableCell>
              <TableCell align="center">Ім'я</TableCell>
              <TableCell align="center">Вік</TableCell>
              <TableCell align="center">Стать</TableCell>
              <TableCell align="center">Предмет</TableCell>
              <TableCell align="center">Дія</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(teachersRes?.data ?? []).map((teacher, idx) => (
              <TableRow key={teacher._id}>
                <TableCell align="left">{idx + 1}</TableCell>
                <TableCell align="center">{teacher.name}</TableCell>
                <TableCell align="center">{teacher.age}</TableCell>
                <TableCell align="center">{teacher.gender}</TableCell>
                <TableCell align="center">{teacher.subject}</TableCell>
                <TableCell align="center" sx={{ maxWidth: "90px" }}>
                  <Button
                    variant="contained"
                    onClick={() => openEditTeacherDialog(teacher._id as string)}
                    sx={{ mr: "10px" }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onDeleteTeacher(teacher._id as string)}
                  >
                    <ClearIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditTeacherDialog
        open={openDialog}
        type={dialogType}
        onClose={onCloseDialog}
        onSave={onSave}
        initialData={selectedTeacherData}
      />
    </Box>
  );
};

export default TeachersInfoPage;
