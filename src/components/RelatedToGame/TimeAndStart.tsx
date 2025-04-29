import React from "react";

import { useEffect } from "react";
import { _stylingAfterStart } from "@pexeso/_inc/_inc_functions";

import { RootState } from "@pexeso/store/store";

import { useSelector, useDispatch } from "react-redux";
import { seconds_counter } from "@pexeso/store/reducers/secondsSlice";
import { set_start_game } from "@pexeso/store/reducers/gameSlice";

import {Button} from '@mui/material';

const startButtonStyles = {
  color: 'white',
  borderRadius: '50%',
  backgroundColor: '#99103a',
  padding: '20px',
  fontSize: '300%', 
  float: 'left',
  fontWeight: 'bold',

  '&:hover': {
    color: '#cc0606',
  },
} as const;


export const TimeAndStart = () => {
  // ---------------------------redux
  const seconds = useSelector((state: RootState) => state.time.seconds);
  const { isRunning, isLoading, colorText, isEnd } = useSelector(
    (state: RootState) => state.game,
  ); //-------------with destructuring
  const dispatch = useDispatch();
  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!isRunning || isLoading || isEnd) return;

    const interval = setInterval(() => {
      dispatch(seconds_counter());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, dispatch, isLoading, isEnd]);

  function timer() {
    /*--------------------------------------------------------------------button start */

    _stylingAfterStart();

    dispatch(set_start_game()); //---------------------------------------------------------start the game
  }

  return (
    <div id="timeAndStart">
      <div style={{ color: colorText }} id="seconds">
        {seconds} s
      </div>

      <Button variant="contained"  id="start" sx={startButtonStyles} onClick={() => { timer(); }} > 
      START</Button>

    </div>
  );
};
