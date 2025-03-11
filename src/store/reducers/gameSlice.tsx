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
        _shuffleArray(state.divImgs);
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
        state.divImgs.forEach(oneDiv => {
          if (oneDiv.classNames.includes("selected_Div_img")) {
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "mask" // remove "selected" and add "mask" class
            ] }/*----------------------------------------------------------------change 2 selected img´s to nonselected and hide */
          } else {
            return oneDiv;/*-----------------------------------------------------if img wasn´t selected -> nothing to change  */
          }
        });
        
        if(action.payload==="medium"/*||action.payload==="hardest"*/){
        
           _shuffleArray(state.divImgs)
        }
      },
      match: (state) =>{
        state.divImgs.forEach(oneDiv => {
          if (oneDiv.classNames.includes("selected_Div_img")) {
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center"
                      
            ] as My_Type_ClassNames[]
             }/*-------------------------------------------------------------- remove selected and add rotate -> change 2 selected img´s to nonselected and hide */
          } else {
            return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
          }
        });
      },
      remove_after_match:(state) =>{
        state.divImgs.forEach(oneDiv => !oneDiv.classNames.includes("rotate-center"));
              
          const isGameEnd = state.divImgs.length === 0;//--------------------if all pictures removed -> it´s end of the game 
          
          if(isGameEnd){            
           state.isRunning= false; state.linkName= "Hraj znova"; state.isEnd=true 
          }
      },
      after_settings_selected_img_count: (state, action) => {
        state.divImgs= action.payload;
        state.isLoading=true; //asi dat true, lebo bola chyba tu isLoaded false .. tak odskušat spravanie !!!!!!
      },
      reset_settings: (state, action) => {
        state.level= "" as My_Type_Level;
        state.bgColor="white"; 
        state.selectedImgCount = 0 as My_Type_ImgCount;
        state.isRunning = false;

      },
      settings_and_styling: (state, action) => {
       
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
  
     
        export const { set_start_game, set_loading, set_img_names, settings_and_styling,
                       after_settings_selected_img_count, remove_after_match, match, un_match,
                       reset_settings, showOne, hardest_level_shuffle     } = gameSlice.actions;
  export default gameSlice.reducer;

// const initialState = {imgNames: [] as My_Type_Img_Name[],
//                       bgColor: "white",
//                       colorText:"black",
//                       isLoading: true,
//                       isRunning: false,
//                       linkName: "Späť na nastavenia hry.",
//                       level:"" as My_Type_Level,
//                       isEnd:false,
//                       divImgs:[] as My_Type_DivImg[],
//                       selectedImgCount: 0 as My_Type_ImgCount
//                       }

// function gameReducer(state = initialState, action:My_Type_Redux_Game_Action ){
    
//     switch(action.type){
//         case 'SET_START_GAME':
//               return { 
//                 ...state,
//                 isRunning: true,
//                 linkName: "Nová hra."    
//               }  
//         // case 'SET_STOP_GAME':
//         //       return { 
//         //         ...state,
//         //         isRunning: false,
//         //         linkName: "Hraj znova"
//         //       } 
        

//         case 'HARDEST_LEVEL_SHUFFLE':
//                 _shuffleArray(state.divImgs)
              
//               return { 
//                  ...state,
//                  divImgs: state.divImgs
//               } 
//         case 'SHOW_ONE':
              
//               let filteredArr: My_Type_DivImg[] =state.divImgs.map(oneDiv => {
//                   if (oneDiv.id === action.payload.id) {
                
//                     return { ...oneDiv, classNames: [
//                       ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
//                     ] }
//                   } else {
//                     return oneDiv; //--------------------------------------------------return untouched object
//                   }
//               });
                    
//               return { 
//                  ...state,
//                  divImgs: filteredArr
//               } 
//         case 'UN_MATCH':
//               let afterUnMatchArr: My_Type_DivImg[] = state.divImgs.map(oneDiv => {
//                 if (oneDiv.classNames.includes("selected_Div_img")) {
//                   return { ...oneDiv, classNames: [
//                     ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "mask" // remove "selected" and add "mask" class
//                   ] }/*----------------------------------------------------------------change 2 selected img´s to nonselected and hide */
//                 } else {
//                   return oneDiv;/*-----------------------------------------------------if img wasn´t selected -> nothing to change  */
//                 }
//               });
              
//               if(action.payload==="medium"/*||action.payload==="hardest"*/){
              
//                  _shuffleArray(afterUnMatchArr)
//               }
//               return { 
//                  ...state,
//                  divImgs: afterUnMatchArr
//               }
//         case 'MATCH':
//               let afterMatchArr = state.divImgs.map(oneDiv => {
//                 if (oneDiv.classNames.includes("selected_Div_img")) {
//                   return { ...oneDiv, classNames: [
//                     ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center"
                            
//                   ] as My_Type_ClassNames[]
//                    }/*-------------------------------------------------------------- remove selected and add rotate -> change 2 selected img´s to nonselected and hide */
//                 } else {
//                   return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
//                 }
//               });
              
//               return { 
//                 ...state,
//                 divImgs: afterMatchArr
//               }
//         case 'REMOVE_AFTER_MATCH':
                   
//               let afterAfterMatchArr = state.divImgs.filter(oneDiv => !oneDiv.classNames.includes("rotate-center"));
              
//               const isGameEnd = afterAfterMatchArr.length === 0;//--------------------if all pictures removed -> it´s end of the game 
          
//               return { 
//                 ...state,
//                 divImgs: afterAfterMatchArr,
//                 ...(isGameEnd && { isRunning: false, linkName: "Hraj znova", isEnd:true })//--if it´s end of the game                             
//                }  
//         case 'AFTER_SETTINGS_SELECTED_IMG_COUNT':
              
//               return { 
//                 ...state,
//                 divImgs: action.payload,
//                 isLoaded:false
//                } 
//         case 'RESET_SETTINGS':
              
//               return { 
//                 ...state,
//                 level: "" as My_Type_Level,
//                 bgColor:"white",
//                 selectedImgCount: 0 as My_Type_ImgCount,
//                 isRunning: false,
//                } 
//         case 'SETTINGS_AND_STYLING':

//             const levelChanges = {/*-----------------------------------------------------------using dynamic object properties*/
//                 easy:  ["black","white"],
//                 medium: ["white", "#4d141d"],
//                 hard:  ["white", "black"]
//               }

//               return{
//                 ...state,
//                 isEnd:false,
//                 linkName:"Späť na nastavenia hry.",
//                 level:action.payload.level,
//                 bgColor:levelChanges[action.payload.level][1] as My_Type_Color_Background,
//                 colorText:levelChanges[action.payload.level][0] as My_Type_Color_Text,
//                 selectedImgCount:action.payload.selectedImgCount as My_Type_ImgCount,
//                }
//         case 'SET_IMG_NAMES':
              
//               return { 
//                 ...state,
//                 imgNames: action.payload,
//                }  
//         case 'SET_LOADING':
              
//               return { 
//                 ...state,
//                 isLoading: false,
//                }        
        
                 
//         default:
//               return state;
//         }  
//     }

// export default gameReducer;