import React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  my_Type_Guard_function,
  my_Type_Guard_function_number,
} from "@pexeso/_inc/_inc_functions";

import { createDivsArrayFromImgNamesAndCountImg } from "@pexeso/_inc/data";
import { after_settings_selected_img_count } from "@pexeso/store/reducers/gameSlice";

import { My_Type_DivImg } from "@pexeso/_inc/my_types";

import { RootState } from "@pexeso/store/store";

import { GameDivPictures } from "./GameDivPictures";
import { TimeAndStart } from "./TimeAndStart";

import { useSelector, useDispatch } from "react-redux";

import { MyMUIButton } from "@pexeso/components/SharedMUIElements/MyMUIButton";
import { Typography, Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";

const gameLinkButtonStyles = {
  backgroundColor: "grey",
  maxWidth: "300px",
  border: "none",
  color: "white",
  fontWeight: "bold",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px auto",
  cursor: "pointer",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s, transform 0.2s",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    color: "goldenrod",
    backgroundColor: "#696969",
  },
} as const;

const welcomeStyles = {
  width: "100%",
  height: "100%",
  m: 0, // margin: 0
  p: 0, // padding: 0
  boxSizing: "border-box",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "@media (min-width:1650px)": {
    width: "1650px",
  },
} as const;

const columnContentStyles = {
  maxWidth: "850px",
  display: "none",
  flexDirection: "column",
  justifyContent: "space-evenly",
} as const;

const colorTextThemeStyles = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

export const Game = () => {
  // ---------------------------redux

 const { imgNames, level, selectedImgCount, linkName } = useSelector(
    (state: RootState) => state.game
  ); //-------------with destructuring

  const dispatch = useDispatch();

  /*---------------------------------------------------------------------------------------------*/
  const navigate = useNavigate();

  useEffect(() => {
    document
      .getElementById("result")
      ?.setAttribute("style", "justify-content: start;"); //temporary solution -> reset just.-cont.:center after endgame
  }, []);

  useEffect(() => {
    if (
      !my_Type_Guard_function(level, ["easy", "medium", "hard"]) ||
      !my_Type_Guard_function_number(selectedImgCount, [5, 6, 7, 8])
    ) {
      navigate("/settings"); // --------------------------------------------------------redirect if settings are not exist or not valid
      return;
    } else {
      // --create array of div > imgs
      const createFinalArrayFroGame = async () => {
        try {
          const imgDivs: My_Type_DivImg[] =
            await createDivsArrayFromImgNamesAndCountImg(
              selectedImgCount,
              imgNames
            );

          dispatch(after_settings_selected_img_count(imgDivs));
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };

      createFinalArrayFroGame(); //-------------------------------------------------to call async f.
    }
  }, [level, selectedImgCount, navigate, dispatch, imgNames]);

  return (
    <>
      <Box 
       className="welcome" sx={welcomeStyles}>
        <MyMUIButton sx={gameLinkButtonStyles} to="/settings">
          {linkName}
        </MyMUIButton>
        <Typography variant="h5" component="h5" sx={colorTextThemeStyles}>
          {" "}
          Pre začatie hry slačte tlačítko štart
        </Typography>{/* originally H3*/}
        <TimeAndStart />
      </Box>
      <Box  className="column_content" id="content" sx={columnContentStyles}>
        <GameDivPictures />
      </Box>
    </>
  );
};

export default Game;
