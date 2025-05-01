import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@pexeso/store/store";

import  {MyMUIButton}  from '@pexeso/components/SharedMUIElements/MyMUIButton';
import { MyMUIImg } from "@pexeso/components/SharedMUIElements/MyMUIImg";
import Typography from '@mui/material/Typography';

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

const btnLinkStyles = {
  backgroundColor: 'white',
  textDecoration: 'none',
  outline: 'none',
  boxShadow: 'none',
  border: 'none',
  '&:hover': {
    boxShadow: 'none',

  },
} as const;

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
      <Typography variant="h2" component="h2" > {/*originally h1 */}
         Hracie obrázky
      </Typography>
      <ImagesArray>
        {isLoading || imgNames.length === 0 ? (//----------------------------------------------if loading show H1
          
          <Typography variant="h2" component="h2" > {/*originally h1 */}
            Načítavajú sa obrázky
          </Typography>
        ) : (//--------------------------------------------------------------------------------after loading show images
          imgNames.map((oneImgName) => (
            <ImgOne  key={oneImgName}>
              {/* <Link to={`/about-game/images/${oneImgName}`}> */}
              <MyMUIButton  to={`/about-game/images/${oneImgName}`} sx={btnLinkStyles}>

                 <MyMUIImg sx={imgStyles} src={`/pictures/pexeso/${oneImgName}.jpg`}/>
            
              </MyMUIButton>  

              {/* </Link> */}
            </ImgOne>
          ))
        )}
      </ImagesArray>
    </Wrapper>
  );
};

export default Images;
