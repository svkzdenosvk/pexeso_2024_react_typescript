import React from 'react';

import { useEffect} from "react";
import {  useNavigate, Link  } from "react-router-dom";
import { My_Type_Level, /*My_Type_Color_Text, My_Type_Color_Background,*/ My_Type_ImgCount, My_Type_Redux_Root_State } from '../../_inc/my_types';
import {  my_Type_Guard_function, my_Type_Guard_function_number } from '../../_inc/_inc_functions';

import { GameDivPictures } from "./GameDivPictures"
import {TimeAndStart} from "./TimeAndStart"

import {useSelector, useDispatch} from 'react-redux'


const Game = () =>{

  // ---------------------------redux

  const settings = useSelector((state: My_Type_Redux_Root_State) => state.game.settings);
  const linkName = useSelector((state: My_Type_Redux_Root_State) => state.game.linkName);
  const colorText = useSelector((state: My_Type_Redux_Root_State) => state.game.colorText);
  
  const dispatch = useDispatch();
 
 /*--------------------------------------------------------------------------------------------------------------------------------------------
 /*--------------------------------------------------------------------------------------------------------------------------------------------*/
 const navigate = useNavigate();
 
 useEffect(() =>{
  document.getElementById("result")?.setAttribute("style", "justify-content: start;");//temporary solution -> reset just.-cont.:center after endgame

 },[])

 useEffect(() => {
    if (!settings || 
      !my_Type_Guard_function(settings.level, ["easy", "medium", "hard"]) || 
      !my_Type_Guard_function_number(settings.imgCount, [5, 6, 7, 8])) {
  
     navigate('/settings'); // --------------------------------------------------------redirect if settings are not exist or not valid
     return;
    } 

     dispatch({type: "SET_LEVEL_AND_STYLING_AND_IMGCOUNT",
               payload:{
                         level: settings.level as My_Type_Level,
                         imgCount: settings.imgCount as My_Type_ImgCount,
                       } })
             
    //    const levelBgColor = {/*--------------------------------------------------------using dynamic object properties*/
    //       easy:  "white" as My_Type_Color_Background,
    //       medium: "#4d141d" as My_Type_Color_Background,
    //       hard:  "black" as My_Type_Color_Background
    //    }
    // setbgColor(levelBgColor[settings.level])
   
 }, [ dispatch, navigate, settings/*, setbgColor, state.level*/]); 

  return (
    <>
         <div className="welcome">
         
            <Link to="/settings" className="end-game-btn"> {linkName} </Link>

            <h3 style={{color: colorText}}> Pre začatie hry slačte tlačítko štart  </h3> 

            <TimeAndStart /> 
         </div>
        
         <div className="column_content" id="content">
            <GameDivPictures 
                      //  level={level} colorText={colorText}
                      //  dispatch={dispatch} selectedImgCount={ imgCount}
                       /> 
         </div>

    </>
  );
}

export default Game;
