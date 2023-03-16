import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type SearchFilterProps = {
  value: string
  onChange: (event: any) => void
}

export default function SearchFilter(props: SearchFilterProps) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mr: '10px' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search students"
        inputProps={{ 'aria-label': 'search students' }}
        onChange={props.onChange}
        value={props.value}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}