import { My_Type_Redux_Game_Action, My_Type_Color_Text, My_Type_Img_Name,
         My_Type_Level, My_Type_Color_Background,
         My_Type_DivImg, My_Type_ClassNames,My_Type_ImgCount } 
         from '../../_inc/my_types';
import { _shuffleArray } from '../../_inc/_inc_functions';


const initialState = {imgNames: [] as My_Type_Img_Name[],
                      bgColor: "white",
                      colorText:"black",
                      isLoading: true,
                      isRunning: false,
                      linkName: "Späť na nastavenia hry.",
                      level:"" as My_Type_Level,
                      isEnd:false,
                      divImgs:[] as My_Type_DivImg[],
                      selectedImgCount: 0 as My_Type_ImgCount
                      }

function gameReducer(state = initialState, action:My_Type_Redux_Game_Action ){
    
    switch(action.type){
        case 'SET_START_GAME':
              return { 
                ...state,
                isRunning: true,
                linkName: "Nová hra."    
              }  
        // case 'SET_STOP_GAME':
        //       return { 
        //         ...state,
        //         isRunning: false,
        //         linkName: "Hraj znova"
        //       } 
        // case 'SET_LEVEL_AND_STYLING_AND_IMGCOUNT':
                
        //       const levelChanges = {/*-----------------------------------------------------------using dynamic object properties*/
        //         easy:  ["black","white"],
        //         medium: ["white", "#4d141d"],
        //         hard:  ["white", "black"]
        //       }
        
        //       return {
        //         ...state,
        //         bgColor:levelChanges[action.payload.level][1] as My_Type_Color_Background,
        //         level:action.payload.level,
        //         colorText:levelChanges[action.payload.level][0] as My_Type_Color_Text,
        //         imgCount:action.payload.imgCount,
        //       }

        case 'HARDEST_LEVEL_SHUFFLE':
                _shuffleArray(state.divImgs)
              
              return { 
                 ...state,
                 divImgs: state.divImgs
              } 
        case 'SHOW_ONE':
              
              let filteredArr: My_Type_DivImg[] =state.divImgs.map(oneDiv => {
                  if (oneDiv.id === action.payload.id) {
                
                    return { ...oneDiv, classNames: [
                      ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
                    ] }
                  } else {
                    return oneDiv; //--------------------------------------------------return untouched object
                  }
              });
                    
              return { 
                 ...state,
                 divImgs: filteredArr
              } 
        case 'UN_MATCH':
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
              
                 _shuffleArray(afterUnMatchArr)
              }
              return { 
                 ...state,
                 divImgs: afterUnMatchArr
              }
        case 'MATCH':
              let afterMatchArr = state.divImgs.map(oneDiv => {
                if (oneDiv.classNames.includes("selected_Div_img")) {
                  return { ...oneDiv, classNames: [
                    ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center"
                            
                  ] as My_Type_ClassNames[]
                   }/*-------------------------------------------------------------- remove selected and add rotate -> change 2 selected img´s to nonselected and hide */
                } else {
                  return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
                }
              });
              
              return { 
                ...state,
                divImgs: afterMatchArr
              }
        case 'REMOVE_AFTER_MATCH':
                   
              let afterAfterMatchArr = state.divImgs.filter(oneDiv => !oneDiv.classNames.includes("rotate-center"));
              
              const isGameEnd = afterAfterMatchArr.length === 0;//--------------------if all pictures removed -> it´s end of the game 
          
              return { 
                ...state,
                divImgs: afterAfterMatchArr,
                ...(isGameEnd && { isRunning: false, linkName: "Hraj znova", isEnd:true })//--if it´s end of the game                             
               }  
        case 'SELECTED_IMG_COUNT':
              
              return { 
                ...state,
                divImgs: action.payload,
                isLoaded:false
               } 
        case 'RESET_SETTINGS':
              
              return { 
                ...state,
                level: "" as My_Type_Level,
                bgColor:"white",
                selectedImgCount: 0 as My_Type_ImgCount,
                isRunning: false,
               } 
        case 'SETTINGS_AND_STYLING':

            const levelChanges = {/*-----------------------------------------------------------using dynamic object properties*/
                easy:  ["black","white"],
                medium: ["white", "#4d141d"],
                hard:  ["white", "black"]
              }

              return{
                ...state,
                isEnd:false,
                linkName:"Späť na nastavenia hry.",
                level:action.payload.level,
                bgColor:levelChanges[action.payload.level][1] as My_Type_Color_Background,
                colorText:levelChanges[action.payload.level][0] as My_Type_Color_Text,
                selectedImgCount:action.payload.selectedImgCount as My_Type_ImgCount,
               }
        case 'SET_IMG_NAMES':
              
              return { 
                ...state,
                imgNames: action.payload,
               }  
        case 'SET_LOADING':
              
              return { 
                ...state,
                isLoading: false,
               }        
        
                 
        default:
              return state;
        }  
    }

export default gameReducer;