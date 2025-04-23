import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 70vh;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const NavigationAbout = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  min-height: 70vh;

  @media (max-width: 600px) {
    width: 100%;
    min-height: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 100px;

  @media (max-width: 600px) {
    margin-top: 20px;
    height: auto;
  }
`;

const StyledLink = styled(NavLink)`
  text-align: center;
  background-color: #808080;
  padding: 20px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
  margin: 10px 0px;

  &:hover {
    color: goldenrod;
    background-color: #696969;
    box-shadow: 0px 4px 8px rgba(255, 165, 0, 0.3);
  }
`;

const MainContentAbout = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  min-height: 70vh;
  width: 70vw;
  font-size: 20px;

  h1 {
    text-align: center;
    width: 70vw;

    @media (max-width: 600px) {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const SharedAboutLayout = () => {
  return (
    <Wrapper>
      <NavigationAbout>
        <Nav>
          <StyledLink to="/about-game/rules">Pravidlá</StyledLink>
          <StyledLink to="/about-game/images">Obrazky</StyledLink>
        </Nav>
      </NavigationAbout>

      <MainContentAbout>
        <Outlet />
      </MainContentAbout>
    </Wrapper>
  );
};

export default SharedAboutLayout;
