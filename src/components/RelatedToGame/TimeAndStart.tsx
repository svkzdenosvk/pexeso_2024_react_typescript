import React from 'react';

import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
import { /*My_Type_Redux_Root_State*/ } from '../../_inc/my_types';

import { RootState } from "../../store/store"; 

import {useSelector, useDispatch} from 'react-redux'
import { seconds_counter} from "../../store/reducers/secondsSlice"; 
import { set_start_game } from '../../store/reducers/gameSlice';


export const TimeAndStart = () => {

     // ---------------------------redux

     const seconds = useSelector((state: RootState) => state.time.seconds);//-------------with destructuring
     const { isRunning, isLoading, colorText, isEnd } = useSelector((state: RootState) => state.game);//-------------with destructuring
      
     const dispatch = useDispatch();
    
    useEffect(() => {

     if (!isRunning || isLoading || isEnd) return;

      // const startTime = Date.now();
      const interval = setInterval(() => {

        // dispatch({ type: 'SECONDS_COUNTER' })
        dispatch(seconds_counter())

        // setSeconds(Math.floor((Date.now() - startTime) / 1000));// ------more accurate second counter (advice from chatGPT)
      }, 1000);
  
      return () => clearInterval(interval);
    }

    , [isRunning,dispatch, isLoading, isEnd]);
   

    function timer(){/*------------------------------------------------------button start */
     
      _stylingAfterStart();

      // dispatch({type: "SET_START_GAME" })
      dispatch(set_start_game())

    }
    
    return (
      <div id="timeAndStart">
          <div style={{color: colorText}} id="seconds"  >{seconds} s</div>

          <div onClick={() => {timer()}} id="start" >START</div>
      </div>
    )
  }
  