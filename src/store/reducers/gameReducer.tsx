import { My_Type_Redux_Game_Action, My_Type_Color_Text, My_Type_Img_Name,
         My_Type_Game_Settings, My_Type_Level, My_Type_Color_Background, My_Type_DivImg } 
         from '../../_inc/my_types';


const initialState = {imgNames: [] as My_Type_Img_Name[],
                      settings:{} as My_Type_Game_Settings,
                      bgColor: "black",
                      colorText:"black",
                      isLoading: true,
                      isRunning: false,
                      linkName: "Späť na nastavenia hry.",
                      level:"" as My_Type_Level,
                      isEnd:false,
                      divImgs:[] as My_Type_DivImg[],
                      
                      }

function gameReducer(state = initialState, action:My_Type_Redux_Game_Action ){
    
    switch(action.type){
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
                
            const levelChanges = {/*-----------------------------------------------------------using dynamic object properties*/
              easy:  ["black","white"],
              medium: ["white", "#4d141d"],
              hard:  ["white", "black"]
            }
        
              return {
                ...state,
                bgColor:levelChanges[action.payload.level][1] as My_Type_Color_Background,
                level:action.payload.level,
                colorText:levelChanges[action.payload.level][0] as My_Type_Color_Text,
                imgCount:action.payload.imgCount,
              }
            default:
              return state;
          }  
    }

export default gameReducer;