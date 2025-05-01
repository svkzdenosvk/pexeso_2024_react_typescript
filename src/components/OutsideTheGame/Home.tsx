import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const Wrapper = styled.div`
  min-height: 70vh;
`;

// const Title = styled.h1`
//   font-size: calc(2rem + 5vw);
// `;

const h1Styles = {
  fontSize: 'calc(2rem + 5vw)',
} as const;

const Home = () => {
  return (
    <Wrapper>
      {/* <Title>Pexeso</Title> */}
      <Typography variant="h1" component="h1" sx={h1Styles}>
        Pexeso
      </Typography>
    </Wrapper>
  );
};

export default Home;

