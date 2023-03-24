import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQuery } from "react-query";
import PageHeader from "../../components/PageHeader/PageHeader";
import LessonsService from "../../services/lessons-service/lessons.service";
import StudentsService from "../../services/students-service/students.service";
import SkippingService from "../../services/skipping-service/skipping.service";
import { getSkippingByIds } from "./utils";
import CircularProgress from "@mui/material/CircularProgress";

const AttendancePage = () => {
  const studentsRes = useQuery("students", StudentsService.getStudents);
  const lessonsRes = useQuery("lessons", LessonsService.getLessons);
  const skippingsRes = useQuery("skippings", SkippingService.getSkippings);
  const addSkippingMutation = useMutation(SkippingService.addSkipping, {
    onSuccess: () => skippingsRes.refetch(),
  });
  const deleteSkippingMutation = useMutation(SkippingService.deleteSkipping, {
    onSuccess: () => skippingsRes.refetch(),
  });

  const onCellClick = (studentId: string, lessonId: string) => () => {
    const skippingData = getSkippingByIds(
      studentId,
      lessonId,
      skippingsRes?.data ?? []
    );

    if (skippingData?.skip) {
      deleteSkippingMutation.mutate(skippingData._id as string);
    } else {
      addSkippingMutation.mutate({ studentId, lessonId, skip: true });
    }
  };

  if (lessonsRes.isLoading || studentsRes.isLoading || skippingsRes.isLoading) {
    return <CircularProgress size={100} sx={{ display: 'block', margin: 'auto'}} />;
  }

  return (
    <Box>
      <PageHeader name="Таблиця пропуків занятть" />
      <TableContainer
        component={Paper}
        sx={{ mt: "20px", maxHeight: "calc(100vh - 190px)" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">№</TableCell>
              <TableCell align="center">Ім'я учня</TableCell>
              {(lessonsRes?.data ?? []).map((lesson) => (
                <TableCell align="center">{lesson.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(studentsRes?.data ?? []).map((student, idx) => (
              <TableRow key={student._id}>
                <TableCell align="left">{idx + 1}</TableCell>
                <TableCell align="center">{student.name}</TableCell>
                {(lessonsRes?.data ?? []).map((lesson) => (
                  <TableCell
                    sx={{
                      "&:hover": {
                        border: "1px solid #00FF00",
                        color: "gray",
                        backgroundColor: "lightblue",
                        cursor: "pointer",
                      },
                    }}
                    align="center"
                    onClick={onCellClick(
                      student._id as string,
                      lesson._id as string
                    )}
                  >
                    {getSkippingByIds(
                      student._id as string,
                      lesson._id as string,
                      skippingsRes?.data
                    )?.skip === true
                      ? "H"
                      : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendancePage;
