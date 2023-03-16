import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";

export default function PageHeader() {
  return (
    <Box sx={{ flexGrow: 1, position: 'static' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            School dashboard
          </Typography>
          <Box sx={{ display: "flex" }}>
            {routes.map((route) => (
              <Link to={route.path} key={route.path} style={{ textDecoration: 'none', color: 'white !important' }}>
                <Typography sx={{ mr: 5}}>
                  {route.name}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
