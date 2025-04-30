import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import  {MyMUIButton}  from '@pexeso/components/SharedMUIElements/MyMUIButton';
import { sharedNavLinkStyles } from "@pexeso/components/StylingComp/SharedStyles";


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

const navLinkStyles = {
  width: '50%',
  
  '@media (max-width: 436px)': {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
 
} as const;


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
          <MyMUIButton sx={[sharedNavLinkStyles, navLinkStyles]} to="/about-game">
            O Hre
          </MyMUIButton>
          <MyMUIButton sx={[sharedNavLinkStyles, navLinkStyles]} to="/settings">
            Hraj hru
          </MyMUIButton>
        </Nav>
      </Navigation>
      <MainContent>
        <Outlet />
      </MainContent>
    </Wrapper>
  );
};

export default SharedLayout;
