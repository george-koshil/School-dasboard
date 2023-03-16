import Container from '@mui/material/Container/Container';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';

interface Props {}

const AboutPage: React.FC<Props> = () => {
  return (
    <Container maxWidth="sm"  sx={{ mt: 5}}>
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" align="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis lectus euismod augue imperdiet blandit.
        Mauris scelerisque leo mauris, ac mollis massa blandit eu. Praesent vel erat vel augue faucibus facilisis eu
        quis sapien. Morbi pharetra arcu ac erat aliquam, vel fringilla lectus malesuada. Sed nec turpis vel nibh
        ultricies dignissim.
      </Typography>
    </Container>
  );
};

export default AboutPage;
