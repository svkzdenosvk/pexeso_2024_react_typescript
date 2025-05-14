import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { RootState } from "@pexeso/store/store";
import { seconds_counter } from "@pexeso/store/reducers/secondsSlice";
import { set_start_game } from "@pexeso/store/reducers/gameSlice";


// ---------- sx styles

const startButtonStyles = {
  color: "white",
  borderRadius: "50%",
  backgroundColor: "#99103a",
  padding: "20px",
  fontSize: "300%",
  float: "left",
  fontWeight: "bold",

  "&:hover": {
    color: "#cc0606",
  },
} as const;

// ---------- component

export const TimeAndStart = () => {
  // ---------------------------redux
  const seconds = useSelector((state: RootState) => state.time.seconds);
  const { isRunning, isLoading, isEnd } = useSelector(
    (state: RootState) => state.game
  ); //-------------with destructuring
  const dispatch = useDispatch();
  //------------------------------------------------------------------------------------------------
  //dynamic styles

  const dynamicstartButtonStyles  ={
    ...startButtonStyles,
    display: isRunning || isEnd ? "none" : "block",
  }

    const dynamicSecondsStyles = (theme: Theme) => ({
      color: theme.palette.text.primary,
      padding: "20px",
      fontSize: "300%",
      float: "left",
      fontWeight: "bold",
      display: isEnd ? "none" : "block",
    });
  
  /*-------------------------------------------------------------------------------------------- */

  useEffect(() => {
    if (!isRunning || isLoading || isEnd) return;

    const interval = setInterval(() => {
      dispatch(seconds_counter());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, dispatch, isLoading, isEnd]);

  function timer() {
    /*--------------------------------------------------------------------button start */

    dispatch(set_start_game()); //----------------------------------------start the game
  }

  return (
    <Box id="timeAndStart" sx={{ display: "flex" }}>
      <Box id="seconds" sx={dynamicSecondsStyles}>
        {seconds} s
      </Box>

      <Button
        variant="contained"
        id="start"
        sx={dynamicstartButtonStyles}
        onClick={() => {
          timer();
        }}
      >
        START
      </Button>
    </Box>
  );
};
