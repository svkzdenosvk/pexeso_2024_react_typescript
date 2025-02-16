import React from 'react';

import { useReducer, useEffect } from "react";
import { useParams, useNavigate, Link  } from "react-router-dom";
import { My_Type_Level, My_Type_Color_Text, My_Type_Color_Background, My_Type_ImgCount,Encrypted, My_Type_UseReducer_Game_State, My_Type_UseReducer_Game_Action } from '../../_inc/my_types';
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
  const { simpleCrypto, setbgColor} = useImgContext();

 // ---------------------------useReducer

 const [state, dispatch] = useReducer<
  React.Reducer<My_Type_UseReducer_Game_State, My_Type_UseReducer_Game_Action>
>(reducer, defaultState);

 
 /*--------------------------------------------------------------------------------------------------------------------------------------------
 /*--------------------------------------------------------------------------------------------------------------------------------------------*/
 
 let settingsData=useParams().settings
   const navigate = useNavigate();

   useEffect(() =>{
      document.getElementById("result")?.setAttribute("style", "justify-content: start;");//temporary solution -> reset just.-cont.:center after endgame
   
   },[])
 
 useEffect(() => {

    if (!settingsData) {//---------------------------------------------------------------when misssing parameters
      navigate("/settings"); 
      return;
    }
    
    // decrypting of data
    let decryptedSettings: Encrypted

    try {
      decryptedSettings = simpleCrypto.decrypt(decodeURIComponent(settingsData)) as Encrypted;
    } catch (error) {
      console.error("❌ Chyba pri dešifrovaní:", error);
      navigate("/settings"); // ---------------------------------------------------------error during en-decrypting -> redirect
      return;
    }

    if (!my_Type_Guard_function(decryptedSettings.level,["easy", "medium", "hard"])|| //-when not valid data
        !my_Type_Guard_function_number(decryptedSettings.imgCount,[5, 6, 7, 8])) {  

        navigate("/settings"); 
        return;
    } 

    dispatch({type: "SET_LEVEL_AND_STYLING_AND_IMGCOUNT",
              payload:{
                        level: decryptedSettings.level as My_Type_Level,
                        imgCount: decryptedSettings.imgCount as My_Type_ImgCount,
                      } })

    const levelBgColor = {/*-------------------------------------------------------------using dynamic object properties*/
         easy:  "white" as My_Type_Color_Background,
         medium: "#4d141d" as My_Type_Color_Background,
         hard:  "black" as My_Type_Color_Background
    }

    setbgColor(levelBgColor[state.level])
       
 }, [ settingsData, dispatch, simpleCrypto, navigate, setbgColor, state.level ]); 


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
