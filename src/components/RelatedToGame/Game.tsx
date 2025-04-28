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

const Game = () => {
  // ---------------------------redux

  const { imgNames, level, selectedImgCount, colorText, linkName } =
    useSelector((state: RootState) => state.game); //-------------with destructuring

  const dispatch = useDispatch();

  /*--------------------------------------------------------------------------------------------------------------------------------------------*/
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
      const createFinalArrayFroGame = async () => {
        try {
          const imgDivs: My_Type_DivImg[] =
            await createDivsArrayFromImgNamesAndCountImg(
              selectedImgCount,
              imgNames
            ); // --create array of div > imgs

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
      <div className="welcome">
        <MyMUIButton sx={gameLinkButtonStyles} to="/settings">
          {linkName}
        </MyMUIButton>

        <h3 style={{ color: colorText }}>
          {" "}
          Pre začatie hry slačte tlačítko štart{" "}
        </h3>

        <TimeAndStart />
      </div>

      <div className="column_content" id="content">
        <GameDivPictures />
      </div>
    </>
  );
};

export default Game;
