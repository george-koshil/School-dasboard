import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "react-query";
import PageHeader from "../../components/PageHeader/PageHeader";
import lessonsService from "../../services/lessons-service/lessons.service";

const LessonsInfoPage = () => {
  const lessonsRes = useQuery("lessons", lessonsService.getLessons);

  return (
    <Box>
      <PageHeader name="Інформація про предмети" />
      <TableContainer
        component={Paper}
        sx={{ mt: "20px", maxHeight: "calc(100vh - 190px)" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">№</TableCell>
              <TableCell align="center">Назва предмету</TableCell>
              <TableCell align="center">Вчитель</TableCell>
              <TableCell align="center">Тип</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(lessonsRes?.data ?? []).map((lesson, idx) => (
              <TableRow key={lesson._id}>
                <TableCell align="left">{idx + 1}</TableCell>
                <TableCell align="center">{lesson.name}</TableCell>
                <TableCell align="center">{lesson.teacher}</TableCell>
                <TableCell align="center">{lesson.subjectType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LessonsInfoPage;
