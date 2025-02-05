import React from 'react';

import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
import { MyTimeAndStartProps } from '../../_inc/my_types';
import { useImgContext } from "../../context/ImgContext";

export const TimeAndStart = ({/*seconds,*/colorText,isRunning,dispatch/*,setSeconds*/} :MyTimeAndStartProps) => {
     const {  isLoading, seconds, setSeconds } = useImgContext();
    
    useEffect(() => {

      if (!isRunning || isLoading ) return;

      const startTime = Date.now();
      const interval = setInterval(() => {
        // let countedSec: number = Math.floor((Date.now() - startTime) / 1000)
        setSeconds(Math.floor((Date.now() - startTime) / 1000));// ---------more accurate second counter (advice from chatGPT)
      }, 1000);
  
      return () => clearInterval(interval);
    }

    , [isRunning,setSeconds, isLoading]);
   

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
  