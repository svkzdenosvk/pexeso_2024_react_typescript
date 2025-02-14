import React from 'react';

import { useReducer, useEffect} from "react";
import {  useNavigate, Link  } from "react-router-dom";
import { My_Type_Level, My_Type_Color_Text, My_Type_Color_Background, My_Type_ImgCount, My_Type_UseReducer_Game_State, My_Type_UseReducer_Game_Action } from '../../_inc/my_types';
import {  my_Type_Guard_function, my_Type_Guard_function_number } from '../../_inc/_inc_functions';

import { GameDivPictures } from "./GameDivPictures"
import {TimeAndStart} from "./TimeAndStart"

import { useImgContext } from "../../context/ImgContext";

 const reducer = (state: My_Type_UseReducer_Game_State, action: My_Type_UseReducer_Game_Action) => {

  switch (action.type) {
   
    case 'SET_START_GAME':
      return { 
        ...state,
        isRunning: true,
        linkName: "Nová hra."

      }  
    case 'SET_STOP_GAME':
    return { 
      ...state,
      isRunning: false,
      linkName: "Hraj znova"
    } 
    case 'SET_LEVEL_AND_STYLING_AND_IMGCOUNT':
        
    const levelChanges = {/*--------------------------------------------using dynamic object properties*/
      easy:  "black",
      medium:"white", 
      hard:  "white"
    }

      return {
        ...state,
        level:action.payload.level,
        colorText:levelChanges[action.payload.level] as My_Type_Color_Text,
        imgCount:action.payload.imgCount,
      }
    default:
      return state;
  }
}

const defaultState: My_Type_UseReducer_Game_State  = {
  level:"" as My_Type_Level,
  isRunning:false,
  linkName:"Späť na nastavenia hry.",
  colorText:"black", 
  imgCount:0 as My_Type_ImgCount
}

const Game = () =>{
  const { settings, setbgColor } = useImgContext();

 // ---------------------------useReducer

 const [state, dispatch] = useReducer<
  React.Reducer<My_Type_UseReducer_Game_State, My_Type_UseReducer_Game_Action>
>(reducer, defaultState);

 
 /*--------------------------------------------------------------------------------------------------------------------------------------------
 /*--------------------------------------------------------------------------------------------------------------------------------------------*/
 const navigate = useNavigate();
 
 useEffect(() =>{
  document.getElementById("result")?.setAttribute("style", "justify-content: start;");//temporary solution -> reset just.-cont.:center after endgame

 },[])

 useEffect(() => {
  if (settings) { // -----------------------------------------------if settings from useReducer were sent

    try {

      if (!my_Type_Guard_function(settings.level,["easy", "medium", "hard"])||
             !my_Type_Guard_function_number(settings.imgCount,[5, 6, 7, 8]))
          {  
            
          //  window.location.href = `/settings`/*----------------------redirect and reload to reset useContext */
           navigate('/settings')

      }else{   

          dispatch({type: "SET_LEVEL_AND_STYLING_AND_IMGCOUNT",
                    payload:{
                              level: settings.level as My_Type_Level,
                              imgCount: settings.imgCount as My_Type_ImgCount,
                            } })
                  
            const levelBgColor = {/*---------------------------------------using dynamic object properties*/
               easy:  "white" as My_Type_Color_Background,
               medium: "#4d141d" as My_Type_Color_Background,
               hard:  "black" as My_Type_Color_Background
            }

            setbgColor(levelBgColor[state.level])

      } 
    } catch (error) {
      console.error("Dešifrovanie zlyhalo:", error);

      window.location.href = `/settings`/*----------------------------redirect and reload to reset useContext */

    }
  }else{
    
    window.location.href = `/settings`/*------------------------------redirect and reload to reset useContext */
   
  }
}, [ dispatch, navigate, settings, setbgColor, state.level]); 

  return (
    <>
         <div className="welcome">
         
            <Link to="/settings" className="end-game-btn"> {state.linkName} </Link>

            <h3 style={{color: state.colorText}}> Pre začatie hry slačte tlačítko štart  </h3> 

            <TimeAndStart
                       dispatch={dispatch}
                       colorText={state.colorText}
                       isRunning={state.isRunning}
                       /> 
         </div>
        
         <div className="column_content" id="content">
            <GameDivPictures 
                       level={state.level} colorText={state.colorText}
                       dispatch={dispatch} selectedImgCount={ state.imgCount}
                       /> 
         </div>

    </>
  );
}

export default Game;
