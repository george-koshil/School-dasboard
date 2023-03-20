import Box from '@mui/material/Box';
import Header from './Header';
import SideBar from './SideBar';

export default function MainLayout() {

  return (
    <Box>
      <Header />
      <SideBar />
    </Box>
  );
}