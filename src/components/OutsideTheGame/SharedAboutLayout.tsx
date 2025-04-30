import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import  {MyMUIButton}  from '@pexeso/components/SharedMUIElements/MyMUIButton';
import { sharedNavLinkStyles } from "@pexeso/components/StylingComp/SharedStyles";

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


const navLinkStyles = {
  margin: '10px 0px;',
   
} as const;

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
          
          <MyMUIButton sx={[sharedNavLinkStyles, navLinkStyles]} to="/about-game/rules">
            Pravidlá
          </MyMUIButton>
          <MyMUIButton sx={[sharedNavLinkStyles, navLinkStyles]} to="/about-game/images">
            Hraj hru
          </MyMUIButton>
        </Nav>
      </NavigationAbout>

      <MainContentAbout>
        <Outlet />
      </MainContentAbout>
    </Wrapper>
  );
};

export default SharedAboutLayout;
