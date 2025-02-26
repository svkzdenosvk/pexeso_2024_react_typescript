import React from 'react';

import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
import { My_Type_Redux_Root_State } from '../../_inc/my_types';

import {useSelector, useDispatch} from 'react-redux'

export const TimeAndStart = () => {

  // const { seconds } = useSelector((state: My_Type_Redux_Root_State) => state.time);//-------------with destructuring
  // const { isRunning, isLoading, colorText } = useSelector((state: My_Type_Redux_Root_State) => state.game);
  

     const seconds = useSelector((state: My_Type_Redux_Root_State) => state.time.seconds);
     const isRunning = useSelector((state: My_Type_Redux_Root_State) => state.game.isRunning);
     const isLoading = useSelector((state: My_Type_Redux_Root_State) => state.game.isLoading);
     const colorText = useSelector((state: My_Type_Redux_Root_State) => state.game.colorText);

     const dispatch = useDispatch();
    
    useEffect(() => {

      if (!isRunning || isLoading ) return;

      // const startTime = Date.now();
      const interval = setInterval(() => {
        // let countedSec: number = Math.floor((Date.now() - startTime) / 1000)
        dispatch({ type: 'COUNT_SECONDS' })
        // setSeconds(Math.floor((Date.now() - startTime) / 1000));// ---------more accurate second counter (advice from chatGPT)
      }, 1000);
  
      return () => clearInterval(interval);
    }

    , [isRunning,dispatch, isLoading]);
   

    function timer(){/*------------------------------------------------------button start */
     
      _stylingAfterStart();

      dispatch({type: "SET_START_GAME" })
    }
    
    return (
      <div id="timeAndStart">
          <div style={{color: colorText}} id="seconds"  >{seconds} s</div>

          <div onClick={() => {timer()}} id="start" >START</div>
      </div>
    )
  }
  