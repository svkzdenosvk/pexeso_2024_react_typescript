import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@pexeso/store/store";

// import {Box} from '@mui/material';
import { MyMUIImg } from "@pexeso/components/SharedMUIElements/MyMUIImg";


// ---------- styled-components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ImagesArray = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1%;
`;

const ImgOne = styled.div``;

const imgStyles = {
  transition: 'box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 0px 28px 19px goldenrod',
  },
} as const;


// ---------- component

const Images = () => {
  const { isLoading, imgNames } = useSelector((state: RootState) => state.game);//-------------with destructuring

  return (
    <Wrapper>
      <h1>Hracie obrázky</h1>
      <ImagesArray>
        {isLoading || imgNames.length === 0 ? (//----------------------------------------------if loading show H1
          <h1>Načítavajú sa obrázky</h1>
        ) : (//--------------------------------------------------------------------------------after loading show images
          imgNames.map((oneImgName) => (
            <ImgOne /*key={uuid.v4()*/ key={oneImgName}>
              <Link to={`/about-game/images/${oneImgName}`}>
                {/* <Box
                   component="img"
                   src={`/pictures/pexeso/${oneImgName}.jpg`}
                   alt="Pexeso img"
                   sx={imgStyles}
                /> */}
                <MyMUIImg sx={imgStyles} src={`/pictures/pexeso/${oneImgName}.jpg`}/>

              </Link>
            </ImgOne>
          ))
        )}
      </ImagesArray>
    </Wrapper>
  );
};

export default Images;
