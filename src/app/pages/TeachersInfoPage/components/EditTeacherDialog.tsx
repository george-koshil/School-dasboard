import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Teacher } from "../../../services/teachers-service/types";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import Box from "@mui/system/Box/Box";

export interface EditTeacherDialogProps {
  type: "edit" | "new";
  open: boolean;
  onClose: () => void;
  onSave: (data: Teacher) => void;
  initialData?: Teacher
}

export default function EditTeacherDialog(props: EditTeacherDialogProps) {
  const formik = useFormik({
    initialValues: props.initialData ?? {
      _id: "",
      name: "",
      age: "",
      gender: "",
      subject: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const { name, age, gender, subject } = values;
      props.onSave({ name, age: +age, gender, subject });
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
            id="subject"
            name="subject"
            label="Предмет"
            onChange={formik.handleChange}
            value={formik.values.subject}
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
