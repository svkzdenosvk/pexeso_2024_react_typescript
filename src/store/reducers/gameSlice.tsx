import { My_Type_Color_Text, My_Type_Img_Name,
         My_Type_Level, My_Type_Color_Background,
         My_Type_DivImg, My_Type_ClassNames,My_Type_ImgCount } 
         from '../../_inc/my_types';
import { _shuffleArray } from '../../_inc/_inc_functions';

import { createSlice } from "@reduxjs/toolkit";

//---------------redux toolkit

const gameSlice = createSlice({
    name: "game",
    initialState: {
      imgNames: [] as My_Type_Img_Name[],
      bgColor: "white" as My_Type_Color_Background,
      colorText:"black" as My_Type_Color_Text,
      isLoading: true,
      isRunning: false,
      linkName: "Späť na nastavenia hry.",
      level:"" as My_Type_Level,
      isEnd:false,
      divImgs:[] as My_Type_DivImg[],
      selectedImgCount: 0 as My_Type_ImgCount
      },
    reducers: {
      set_start_game: (state) => {
        state.isRunning= true;
        state.linkName= "Nová hra."; 
      },
      hardest_level_shuffle: (state) => {
        let afterUnMatchArr = _shuffleArray(state.divImgs);

        state.divImgs=afterUnMatchArr;
      },
      showOne: (state, action) => {
        state.divImgs.forEach((oneDiv) => {
          if (oneDiv.id === action.payload.id) {
            oneDiv.classNames = [
              ...oneDiv.classNames.filter((className) => className !== "mask"),
              "selected_Div_img",
            ];
          }
        });
      },
      un_match: (state, action) => {
          let afterUnMatchArr: My_Type_DivImg[] = state.divImgs.map(oneDiv => {
  
          if (oneDiv.classNames.includes("selected_Div_img")) {
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "mask" // remove "selected" and add "mask" class
            ] }/*----------------------------------------------------------------change 2 selected img´s to nonselected and hide */
          } else {
            return oneDiv;/*-----------------------------------------------------if img wasn´t selected -> nothing to change  */
          }
        });
        
        if(action.payload==="medium"/*||action.payload==="hardest"*/){
        
          afterUnMatchArr = _shuffleArray(afterUnMatchArr)
        }
         state.divImgs=afterUnMatchArr;
      },
      match: (state) =>{
       
          let afterMatchArr: My_Type_DivImg[] = state.divImgs.map(oneDiv => {

          if (oneDiv.classNames.includes("selected_Div_img")) {
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center"
                      
            ] as My_Type_ClassNames[]
             }/*-------------------------------------------------------------- remove selected and add rotate -> change 2 selected img´s to nonselected and hide */
          } else {
            return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
          }
        });

      state.divImgs=afterMatchArr;

      },
      remove_after_match:(state) =>{
        let afterAfterMatchArr: My_Type_DivImg[] = state.divImgs.filter(oneDiv => !oneDiv.classNames.includes("rotate-center"));
              
          state.divImgs=afterAfterMatchArr;//--------------------if all pictures removed -> it´s end of the game 

          if(state.divImgs.length === 0){    
                   
           state.isRunning= false; state.linkName= "Hraj znova"; state.isEnd=true 
          }
          
      },
      after_settings_selected_img_count: (state, action) => {
        state.divImgs= action.payload;
        // state.isLoading=false; //asi dat true, lebo bola chyba tu isLoaded false .. tak odskušat spravanie !!!!!!
      },
      reset_settings: (state) => {
        state.level= "" as My_Type_Level;
        state.bgColor="white"; 
        state.selectedImgCount = 0 as My_Type_ImgCount;
        state.isRunning = false;

      },
      settings_and_styling_before_start: (state, action) => {
       
        const levelChanges: Record<My_Type_Level, [My_Type_Color_Text, My_Type_Color_Background]> = {/*-----------------------------------------------------------using dynamic object properties*/
          easy:  ["black","white"],
          medium: ["white", "#4d141d"],
          hard:  ["white", "black"]
        }

        state.isEnd=false;
        state.linkName="Späť na nastavenia hry.";
        state.level= action.payload.level;
        state.bgColor= levelChanges[action.payload.level as My_Type_Level][1] as My_Type_Color_Background;
        state.colorText= levelChanges[action.payload.level as My_Type_Level][0] as My_Type_Color_Text;
        state.selectedImgCount=action.payload.selectedImgCount as My_Type_ImgCount;
      },
      set_img_names: (state, action) => {
        state.imgNames= action.payload;
      },
      set_loading: (state) => {
        state.isLoading= false;
      },     
      
    },
  });
  
     
        export const { set_start_game, set_loading, set_img_names, settings_and_styling_before_start,
                       after_settings_selected_img_count, remove_after_match, match, un_match,
                       reset_settings, showOne, hardest_level_shuffle     } = gameSlice.actions;
  export default gameSlice.reducer;

