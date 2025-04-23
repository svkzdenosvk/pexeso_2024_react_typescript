import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Navigation = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  background-color: #808080;


  @media (max-width: 436px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const StyledLink = styled(NavLink)`
  width: 50%;
  padding: 20px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: goldenrod;
    background-color: #696969;
    box-shadow: 0px 4px 8px rgba(255, 165, 0, 0.3);
  }

  @media (max-width: 436px) {
    width: 100%;
    text-align: center;
    align-items: center;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100%;
  width: 100%;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SharedLayout = () => {
  return (
    <Wrapper>
      <Navigation>
        <Nav>
          <StyledLink to="/about-game">O Hre</StyledLink>
          <StyledLink to="/settings">Hraj hru</StyledLink>
        </Nav>
      </Navigation>
      <MainContent>
        <Outlet />
      </MainContent>
    </Wrapper>
  );
};

export default SharedLayout;
