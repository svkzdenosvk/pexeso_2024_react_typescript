import React from "react";

import { useEffect } from "react";
import { _stylingAfterStart } from "../../_inc/_inc_functions";

import { RootState } from "../../store/store";

import { useSelector, useDispatch } from "react-redux";
import { seconds_counter } from "../../store/reducers/secondsSlice";
import { set_start_game } from "../../store/reducers/gameSlice";

export const TimeAndStart = () => {
  // ---------------------------redux

  const seconds = useSelector((state: RootState) => state.time.seconds); //-------------with destructuring
  const { isRunning, isLoading, colorText, isEnd } = useSelector(
    (state: RootState) => state.game,
  ); //-------------with destructuring

  const dispatch = useDispatch();

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

    dispatch(set_start_game());
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
