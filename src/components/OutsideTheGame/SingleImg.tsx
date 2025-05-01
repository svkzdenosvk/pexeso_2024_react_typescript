import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { my_Type_Guard_function } from "@pexeso/_inc/_inc_functions";
import { RootState } from "@pexeso/store/store";

import  {MyMUIButton}  from '@pexeso/components/SharedMUIElements/MyMUIButton';
import { MyMUIImg } from "@pexeso/components/SharedMUIElements/MyMUIImg";
import Typography from '@mui/material/Typography';

import { pulsatingButtonStyles } from "@pexeso/components/StylingComp/SharedStyles";

// --- styled-components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SingleImgMain = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;


const imgStyles = {
  width: "200px",
  height: "200px",
 
} as const;


const SingleImg = () => {
  const { imgNames } = useSelector((state: RootState) => state.game);

  const [errorImgName, setErrorImgName] = useState(false);
  const [imgNameH1, setNameH1] = useState("");

  let imgName = useParams().name ?? "Error";// --------------------------------if undefined -> "Error" string

  if (imgNameH1 === "vesmir") setNameH1("vesmír");
  if (imgNameH1 === "vibracia") setNameH1("vibrácia");

  useEffect(() => {
    if (!my_Type_Guard_function(imgName, imgNames)) {
      setErrorImgName(true);
      setNameH1("Neexistujúci obrázok");
    } else {
      setErrorImgName(false);
      setNameH1(imgName);
    }
  }, [imgName, imgNames]);

  return (
    <Wrapper>
      {/* // <h1>{imgNameH1.charAt(0).toUpperCase() + imgNameH1.slice(1)}</h1> */}
      <Typography variant="h3" component="h3" > {/*originally h1 */}
         {imgNameH1.charAt(0).toUpperCase() + imgNameH1.slice(1)}
      </Typography>
      <SingleImgMain>
        {errorImgName ? (//-------------------------------------------------------if name of img not exists in db
          <div>
            {/* // <h1>Error, tento obrázok neexistuje</h1> */}
            <Typography variant="h3" component="h3" > {/*originally h1 */}
              Error, tento obrázok neexistuje
            </Typography>
            <MyMUIButton sx={pulsatingButtonStyles} to="/about-game/images">
              Klikni sem a poď na stránku obrázkov
            </MyMUIButton>
          </div>
        ) : (
          <>
            <MyMUIImg sx={imgStyles} src={`/pictures/pexeso/${imgName}.jpg`}/>

            <MyMUIButton sx={pulsatingButtonStyles} to="/about-game/images">
              Späť na stránku obrázkov
            </MyMUIButton>
          
          </>
        )}
      </SingleImgMain>
    </Wrapper>
  );
};

export default SingleImg;
