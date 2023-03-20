import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function SideBar() {
  return (
    <Paper
      sx={{
        position: "absolute",
        left: 0,
        top: "64px",
        width: "200px",
        height: "calc(100vh - 64px)",
        zIndex: 1000,
        borderRadius: 0,
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
        sx={{ width: "100%" }}
      >
        {routes.map((route) => (
          <Link
            to={route.path}
            key={route.path}
            style={{ textDecoration: "none", width: '100%' }}
          >
            <Button key={route.path} sx={{ width: '100%'}}>{route.name}</Button>
          </Link>
        ))}
      </ButtonGroup>
    </Paper>
  );
}
