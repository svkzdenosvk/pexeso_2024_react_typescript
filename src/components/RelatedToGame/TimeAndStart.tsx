import React from "react";

import { useEffect } from "react";
import { _stylingAfterStart } from "@pexeso/_inc/_inc_functions";
import { My_Type_Redux_Root_State } from "@pexeso//_inc/my_types";

import { useSelector, useDispatch } from "react-redux";

export const TimeAndStart = () => {
  // ---------------------------redux

  const seconds = useSelector(
    (state: My_Type_Redux_Root_State) => state.time.seconds,
  );
  const { isRunning, isLoading, colorText, isEnd } = useSelector(
    (state: My_Type_Redux_Root_State) => state.game,
  ); //-------------with destructuring

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isRunning || isLoading || isEnd) return;

    const interval = setInterval(() => {
      dispatch({ type: "SECONDS_COUNTER" });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, dispatch, isLoading, isEnd]);

  function timer() {
    /*------------------------------------------------------button start */

    _stylingAfterStart();

    dispatch({ type: "SET_START_GAME" });
  }

  return (
    <div id="timeAndStart">
      <div style={{ color: colorText }} id="seconds">
        {seconds} s
      </div>

      <div
        onClick={() => {
          timer();
        }}
        id="start"
      >
        START
      </div>
    </div>
  );
};
