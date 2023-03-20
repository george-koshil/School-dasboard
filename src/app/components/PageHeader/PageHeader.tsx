import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PageHeaderProps {
  name: string
  children?: React.ReactNode
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
      <Typography variant="h4">{props.name}</Typography>
      {props.children}
    </Box>
  );
}
