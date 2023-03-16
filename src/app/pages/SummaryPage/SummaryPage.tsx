import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography/Typography";
import { Box } from "@mui/system";
import { useAppSelector } from "../../hooks";
import { selectStudents } from "../../slices/studentsSlice/studentsSlice";

const SummaryPage = () => {
  const students = useAppSelector(selectStudents);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Загальні дані про учнів
      </Typography>
      <Typography variant="body1" align="justify">
        В цьому розділі можна побачити загальну статистику учнів
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Typography
           variant="body1"
          align="left"
          gutterBottom
          sx={{ mr: "15px" }}
        >
          Загальна кількість учнів в класі
        </Typography>
        <Typography  variant="body1" align="left" gutterBottom>
          {students.items.length}
        </Typography>
      </Box>

    </Container>
  );
};

export default SummaryPage;
