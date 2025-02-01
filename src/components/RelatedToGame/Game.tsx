import React from 'react';

import { useReducer, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js"; //------------------------this provide crypting and decrypting params in URL
import { My_Type_Level, My_Type_Color_Text, My_Type_Color_Background, My_Type_ImgCount,Encrypted, My_Type_UseReducer_Game_State, My_Type_UseReducer_Game_Action } from '../../_inc/my_types';
import {  my_Type_Guard_function, my_Type_Guard_function_number } from '../../_inc/_inc_functions';

import { GameDivPictures } from "./GameDivPictures"
import {TimeAndStart} from "./TimeAndStart"
// import { useImgContext } from "../../context/ImgContext";

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
      easy:  ["black","white"],
      medium:["white", "#4d141d"],
      hard:  ["white","black"]
    }

      return {
        ...state,
        level:action.payload.level,
        colorText:levelChanges[action.payload.level][0] as My_Type_Color_Text,
        colorBG:levelChanges[action.payload.level][1] as My_Type_Color_Background,
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
  colorBG:"white",
  imgCount:0 as My_Type_ImgCount
}

const Game = () =>{
  // const { imgNames } = useImgContext();

 // ---------------------------useReducer

 const [state, dispatch] = useReducer<
  React.Reducer<My_Type_UseReducer_Game_State, My_Type_UseReducer_Game_Action>
>(reducer, defaultState);

 //----------------------------useState

 let [seconds, setSeconds] = useState<number>(0);

 /*--------------------------------------------------------------------------------------------------------------------------------------------
 /*--------------------------------------------------------------------------------------------------------------------------------------------*/
 
 let settingsData=useParams().settings
 const navigate = useNavigate();


 useEffect(() => {
  if (settingsData) { // -----------------------------------------------if params were sent

   const secretKey = "encryption-key-for-settings"; // same key as on settings page 
   const simpleCrypto = new SimpleCrypto(secretKey);

    try {
      // decrypting of data
       let decryptedSettings = simpleCrypto.decrypt(decodeURIComponent(settingsData)) as Encrypted;
       //let decryptedSettings: Encrypted = JSON.parse(decodeURIComponent(settingsData));

      if (!my_Type_Guard_function(decryptedSettings.level,["easy", "medium", "hard"])||
             !my_Type_Guard_function_number(decryptedSettings.imgCount,[5, 6, 7, 8]))
          {  
            
           navigate('/settings'); 
           
           if(["medium", "hard"].includes(decryptedSettings.level)){
             window.location.reload(); //--------------------------------reset color changes (background, ..) 
           }
      }    

          dispatch({type: "SET_LEVEL_AND_STYLING_AND_IMGCOUNT",
                    payload:{
                              level: decryptedSettings.level as My_Type_Level,
                              imgCount: decryptedSettings.imgCount as My_Type_ImgCount,
                            } })

          document.getElementsByTagName("BODY")[0].setAttribute('style', 'background-color: '+ state.colorBG);

    } catch (error) {
      console.error("Dešifrovanie zlyhalo:", error);
      navigate('/settings'); 

    }
  }else{
    
    navigate('/settings'); 
    // window.location.reload();
   
  }
}, [ settingsData, dispatch, navigate, state.colorBG]); 

  return (
    <>
         <div className="welcome">
         
            <a href="/settings" className="end-game-btn" > {state.linkName} </a>
                      
            <h3 style={{color: state.colorText}}> Pre začatie hry slačte tlačítko štart  </h3> 

            <TimeAndStart
                       seconds ={seconds} 
                       setSeconds ={setSeconds}
                       dispatch={dispatch}
                       colorText={state.colorText}
                       isRunning={state.isRunning}
                       /> 
         </div>
        
         <div className="column_content" id="content">
            <GameDivPictures 
                       level={state.level} seconds={seconds} 
                       colorText={state.colorText} dispatch={dispatch}
                       selectedImgCount={ state.imgCount}
                      //  imgNames={imgNames} 
                       /> 
         </div>

    </>
  );
}

export default Game;
