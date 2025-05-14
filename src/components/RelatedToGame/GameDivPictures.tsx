import React from "react";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { My_Type_DivImg } from "@pexeso/_inc/my_types";
import { RootState } from "@pexeso/store/store";
import {
  showOne,
  match,
  un_match,
  hardest_level_shuffle,
} from "@pexeso/store/reducers/gameSlice";
import { MyMUIImg } from "@pexeso/components/SharedMUIElements/MyMUIImg";

// ---------- sx styles

const imgStyles = {
  width: "107px",
  height: "107px",
  opacity: "0%",
} as const;

const rowStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  flex: "1 1 50%",
  mt: "1.5%",
} as const;

const colorTextThemeStyles = (theme: Theme) => ({
  color: theme.palette.text.primary,
});

// ---------- component

export const GameDivPictures = () => {
  // ---------------------------redux

  const { divImgs, level, isLoading, isEnd } = useSelector(
    (state: RootState) => state.game
  ); //-------------with destructuring

  const dispatch = useDispatch();

  /*-------------------------------------------------------------------------------------------------*/

  // ---------------------------
  // ---------------------------ending fn
  // ---------------------------

  const checkEnd = useCallback(() => {
    /*----------------------------------------check if is end == each picture removed */

    if (isEnd) {
     
        // document.getElementsByTagName("BODY")[0].firstElementChild?.classList.add('div_center');/*start ---animation of gratulation text */
      document
        .getElementById("result")
        ?.setAttribute("style", "justify-content: center;");
     
    } else return;
  }, [isEnd]); //-------------------------------------------adding dependencies

  // --------fn to show div>img
  function showImg(element: HTMLDivElement, divObject: My_Type_DivImg) {
    /* after match */
    let selectedArr = divImgs.filter((oneDiv) =>
      oneDiv.classNames.includes("selected_Div_img")
    );
    let rotateddArr = divImgs.filter((oneDiv) =>
      oneDiv.classNames.includes("rotate-center")
    );

    if (
      /*-------------if divImg is not selected + prevent 3 imgs show*/
      element.classList.contains("mask") &&
      (selectedArr.length === 0 || selectedArr.length === 1) &&
      rotateddArr.length === 0
    ) {
      dispatch(showOne(divObject));
    }
  }

  useEffect(() => {
    setTimeout(function () {
      let selectedArr: My_Type_DivImg[] = divImgs.filter((oneDiv) =>
        oneDiv.classNames.includes("selected_Div_img")
      );

      if (selectedArr.length === 2) {
        /* --------------------if match */
        if (selectedArr[0].name === selectedArr[1].name) {
          dispatch(match());
        } else {
          /* ------------------else if unmatch */

          dispatch(un_match(level));
        }
      }

      document.body.style.pointerEvents =
        "auto"; /*---------------------------------------------------------------give back functionality to pointer*/
    }, 200);

    //-------------------------in the hardest level shuffeling every 400 ms
    if (level === "hard") {
      const intervalShuffleHardest = setInterval(() => {
        dispatch(hardest_level_shuffle());
      }, 400);

      return () => clearInterval(intervalShuffleHardest);
    }
  }, [dispatch, divImgs, checkEnd, level]);

  //---------------------------check end useEffect
  useEffect(() => {
    checkEnd();
  }, [checkEnd, isEnd]);

  return (
    <Box className="row" id="row" sx={rowStyles}>
      {isLoading ? ( //--------if loading is not done then show
        <Typography variant="h2" component="h2" sx={colorTextThemeStyles}>
          {" "}
          {/* originally H1*/} Načítavajú sa obrázky
        </Typography>
      ) : (
        //-----------------------------------------------------------------------if not loading (after successful l.) show
        divImgs.map(
          (
            oneDiv: My_Type_DivImg //-------------------------------------------array of img names -> div>img
          ) => (
            <Box
              key={oneDiv.id}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                const currentDiv = e.currentTarget; // --------------------------this is always <div> with `div_on_click`
                showImg(currentDiv, oneDiv);
              }}
              className={oneDiv.classNames.join(" ")}
            >
              <MyMUIImg
                sx={imgStyles}
                src={`/pictures/pexeso/${oneDiv.name}.jpg`}
              />
            </Box>
          )
        )
      )}
    </Box>
  );
};
