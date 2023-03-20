import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import Box from "@mui/system/Box/Box";
import { Student } from "../../../services/students-service/types";

export interface EditStudentDialogProps {
  type: "edit" | "new";
  open: boolean;
  onClose: () => void;
  onSave: (data: Student) => void;
  initialData?: Student
}

export default function EditStudentDialog(props: EditStudentDialogProps) {
  const formik = useFormik({
    initialValues: props.initialData ?? {
      _id: "",
      name: "",
      age: "",
      gender: "",
      grade: "",
      hobby: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const { name, age, gender, grade, hobby } = values;
      props.onSave({ name, age: +age, gender, grade: +grade, hobby });
    },
  });

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>
        {props.type === "new"
          ? "Створити нового вчителя"
          : "Редагувати вчителя"}
      </DialogTitle>

      <form onSubmit={formik.handleSubmit} style={{ padding: '20px' }}>
        <Box sx={{ display: "flex", flexDirection: "column " }}>
          <TextField
            sx={{ mb: '10px' }}
            required
            id="name"
            name="name"
            label="Ім'я"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <TextField
            sx={{ mb: '10px' }}
            required
            id="age"
            name="age"
            label="Вік"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
          <TextField
            sx={{ mb: '10px' }}
            required
            id="gender"
            name="gender"
            label="Стать"
            onChange={formik.handleChange}
            value={formik.values.gender}
          />
          <TextField
            sx={{ mb: '10px' }}
            required
            id="grade"
            name="grade"
            label="Клас"
            onChange={formik.handleChange}
            value={formik.values.grade}
          />
          <TextField
            sx={{ mb: '10px' }}
            required
            id="hobby"
            name="hobby"
            label="Хоббі"
            onChange={formik.handleChange}
            value={formik.values.hobby}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: 'center' }}>
          <Button onClick={props.onClose} sx={{ mr: '10px'}}>Відмінити</Button>
          <Button type="submit">Зберегти</Button>
        </Box>
      </form>
    </Dialog>
  );
}
