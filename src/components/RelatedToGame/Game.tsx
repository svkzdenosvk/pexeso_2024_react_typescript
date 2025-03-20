import React from 'react';

import { useEffect} from "react";
import {  useNavigate, Link  } from "react-router-dom";
import {  my_Type_Guard_function, my_Type_Guard_function_number } from '../../_inc/_inc_functions';

import { RootState } from "../../store/store"; 

import { GameDivPictures } from "./GameDivPictures"
import {TimeAndStart} from "./TimeAndStart"

import {useSelector} from 'react-redux'

const Game = () =>{

  // ---------------------------redux

  const { level, selectedImgCount, colorText, linkName } = useSelector((state: RootState) => state.game);//-------------with destructuring
   

 /*--------------------------------------------------------------------------------------------------------------------------------------------*/
 const navigate = useNavigate();
 
 useEffect(() =>{
  document.getElementById("result")?.setAttribute("style", "justify-content: start;");//temporary solution -> reset just.-cont.:center after endgame

 },[])

 useEffect(() => {
    if (
      !my_Type_Guard_function(level, ["easy", "medium", "hard"]) || 
      !my_Type_Guard_function_number(selectedImgCount, [5, 6, 7, 8])) {
  
     navigate('/settings'); // --------------------------------------------------------redirect if settings are not exist or not valid
     return;
    } 
                
 }, [ level,selectedImgCount, navigate]); 

  return (
    <>
         <div className="welcome">
         
            <Link to="/settings" className="end-game-btn"> {linkName} </Link>

            <h3 style={{color: colorText}}> Pre začatie hry slačte tlačítko štart  </h3> 

            <TimeAndStart /> 
         </div>
        
         <div className="column_content" id="content">
            <GameDivPictures /> 
         </div>

    </>
  );
}

export default Game;
