import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type GradePickerProps = {
  value: number,
  onSelect: (value: number) => void
}

const gradesList = [1, 2]

export default function GradePiker(props: GradePickerProps) {

  const handleChange = (event: SelectChangeEvent) => {
    props.onSelect(event.target.value as unknown as number);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="grade">Оберіть клас</InputLabel>
        <Select
          labelId="grade"
          id="grade-select"
          label="Клас"
          value={props.value.toString()}
          onChange={handleChange}
        >
          {gradesList.map(grade => (
            <MenuItem value={grade} key={grade}>{grade}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}