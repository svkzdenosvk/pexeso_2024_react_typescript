import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@pexeso/store/store";

// import { v4 as uuidv4 } from "uuid";
const uuid = require("uuid");


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

const StyledImg = styled.img`
  &:hover {
    transition: box-shadow 0.3s ease;
    -webkit-box-shadow: 0px 0px 28px 19px goldenrod;
    -moz-box-shadow: 0px 0px 28px 19px goldenrod;
    box-shadow: 0px 0px 28px 19px goldenrod;
    cursor: pointer;
  }
`;

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
            <ImgOne key={uuid.v4()}>
              <Link to={`/about-game/images/${oneImgName}`}>
                <StyledImg
                  src={`/pictures/pexeso/${oneImgName}.jpg`}
                  alt="Pexeso img"
                />
              </Link>
            </ImgOne>
          ))
        )}
      </ImagesArray>
    </Wrapper>
  );
};

export default Images;
