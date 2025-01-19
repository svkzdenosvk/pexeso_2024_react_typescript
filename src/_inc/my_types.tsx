import { Dispatch, SetStateAction } from 'react';

  // type My_Type_Dispatch = React.Dispatch<My_Type_UseReducer_Game_Action>;

type _inc_Type ={
    seconds: number;
    // dispatch: My_Type_Dispatch;
    dispatch: React.Dispatch<My_Type_UseReducer_Game_Action>;
    // colorText: "black"|"white";
    colorText: string;

  }

export type My_Type_Level = "easy"| "medium"| "hard";

export type My_Type_Img_Name = "blesk"| "drevo"| "kvapka"| "more"| "slnko"| "vesmir"| "vibracia"|"vietor";

export type My_Type_ImgCount = 5 | 6 | 7 | 8;

export type My_Type_Image = { 
  id: string;
  name: My_Type_Img_Name
};
  
export type MyTimeAndStartProps = _inc_Type & {
    isRunning: boolean;
     setSeconds: Dispatch<SetStateAction<number>>;

  }

export type MyGameDivPicturesProps= _inc_Type &{
  level: My_Type_Level;
  selectedImgCount: My_Type_ImgCount; 
}

export type Encrypted = {
  level: My_Type_Level;
  imgCount: My_Type_ImgCount;
  gameId: number;
};

export type My_Type_UseReducer_Game_State = {
  level: My_Type_Level;
  isRunning: boolean;
  linkName: string;
  // colorText: "black" | "white";
  colorText: string;
  // colorBG:"black"|"white"|"#4d141d"; 

  colorBG: string; 
  imgCount: My_Type_ImgCount
}

export type My_Type_UseReducer_Game_Action =
  | { type: 'SET_START_GAME' }
  | { type: 'SET_STOP_GAME' }
  | {
      type: 'SET_LEVEL_AND_STYLING_AND_IMGCOUNT';
      payload: { level: My_Type_Level; imgCount: My_Type_ImgCount };
    };