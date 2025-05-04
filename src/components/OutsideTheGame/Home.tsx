import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const Wrapper = styled.div`
  min-height: 70vh;
`;


const h1Styles = {
  fontSize: 'calc(2rem + 5vw)',
  fontWeight: 'bold',
  fontFamily: '"Times New Roman", serif', 
} as const;

const Home = () => {
  return (
    <Wrapper>
      <Typography variant="h1" component="h1" sx={h1Styles}>
        Pexeso
      </Typography>
    </Wrapper>
  );
};

export default Home;

