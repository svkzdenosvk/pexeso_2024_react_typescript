import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 70vh;
`;

const Title = styled.h1`
  font-size: calc(2rem + 5vw);
`;

const Home = () => {
  return (
    <Wrapper>
      <Title>Pexeso</Title>
    </Wrapper>
  );
};

export default Home;

