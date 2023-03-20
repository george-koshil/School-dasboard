import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SchoolIcon from '@mui/icons-material/School';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, position: "static" }}>
      <AppBar position="static">
        <Toolbar>
          <SchoolIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: '10px'}}>
             Digital School
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
