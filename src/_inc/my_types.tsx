import { Dispatch, SetStateAction } from 'react';

type _inc_Type ={
    seconds: number;
    dispatch: React.Dispatch<My_Type_UseReducer_Game_Action>;
    colorText: My_Type_Color_Text;

  }

export type My_Type_Level = "easy"| "medium"| "hard";
export type My_Type_Level_Svk = "Ľahký"| "Stredný"| "Ťažký";

export type My_Type_Img_Name = "blesk"| "drevo"| "kvapka"| "more"| "slnko"| "vesmir"| "vibracia"|"vietor";

export type My_Type_ImgCount = 5 | 6 | 7 | 8;

export type My_Type_Color_Text = "black"|"white";

export type My_Type_Color_Background = My_Type_Color_Text |"#4d141d";

export type My_Type_ClassNames = "mask"|"selected_Div_img"|"rotate-center"|"div_on_click";


export type My_Type_Image = { 
  id: string;
  name: My_Type_Img_Name
};

export type My_Type_DivImg = My_Type_Image & {/*------------------------------div above img element  */
   classNames: My_Type_ClassNames[];
}
  
export type MyTimeAndStartProps = _inc_Type & {/*-----------------------------type of props of TimeAndStart component */
    isRunning: boolean;
    setSeconds: Dispatch<SetStateAction<number>>;
}

export type MyGameDivPicturesProps= _inc_Type & ImgNamesinProps &{/*-----------type of props of GameDivPictures component */
  level: My_Type_Level;
  selectedImgCount: My_Type_ImgCount; 
}

export type ImgNamesinProps = {/*----------------------------------------------shared props -> img names from db */
  imgNames: My_Type_Img_Name[];
}

export type Encrypted = {/*-----------------------------------------------------encrypt-decrypt type of info to initialize the game */
  level: My_Type_Level;
  imgCount: My_Type_ImgCount;
  gameId: string;
}

export type My_Type_Svk_Eng_level ={
  value: My_Type_Level;
  label: My_Type_Level_Svk;
}

/*-----------------------------------------------------------------------------useReducer Game */
export type My_Type_UseReducer_Game_State = {
  level: My_Type_Level;
  isRunning: boolean;
  linkName: string;
  colorText : My_Type_Color_Text;
  colorBG: string; 
  imgCount: My_Type_ImgCount;
}

export type My_Type_UseReducer_Game_Action =
  | { type: 'SET_START_GAME' }
  | { type: 'SET_STOP_GAME' }
  | {
      type: 'SET_LEVEL_AND_STYLING_AND_IMGCOUNT';
      payload: { level: My_Type_Level; imgCount: My_Type_ImgCount };
    };

/*----------------------------------------------------------------------------useReducer GameDivPictures */
export type My_Type_UseReducer_GameDivPictures_State = {
   isLoaded: boolean;
   divImgs: My_Type_DivImg[];
   isEnd: boolean;
 
 }

 export type My_Type_UseReducer_GameDivPictures_Action =
 | { type: 'HARDEST_LEVEL_SHUFFLE' }
 | { 
     type: 'SHOW_ONE';
     payload: My_Type_DivImg
  }
 | { type: 'UN_MATCH';
     payload: My_Type_Level 
   }
 | { type: 'MATCH' }
 | { type: 'REMOVE_AFTER_MATCH' }
 | { 
     type: 'SELECTED_IMG_COUNT';
     payload: My_Type_DivImg[] 

   };

 