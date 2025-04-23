import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@pexeso/store/store";

// import { v4 as uuidv4 } from "uuid";
const uuid = require("uuid");


// ---------- styled-components

const ImgContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ImgMainContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1%;
`;

const ImgWrapper = styled.div``;

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
  const { isLoading, imgNames } = useSelector((state: RootState) => state.game);

  return (
    <ImgContent>
      <h1>Hracie obrázky</h1>
      <ImgMainContent>
        {isLoading || imgNames.length === 0 ? (
          <h1>Načítavajú sa obrázky</h1>
        ) : (
          imgNames.map((oneImgName) => (
            <ImgWrapper key={uuid.v4()}>
              <Link to={`/about-game/images/${oneImgName}`}>
                <StyledImg
                  src={`/pictures/pexeso/${oneImgName}.jpg`}
                  alt="Pexeso img"
                />
              </Link>
            </ImgWrapper>
          ))
        )}
      </ImgMainContent>
    </ImgContent>
  );
};

export default Images;
