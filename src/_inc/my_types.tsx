import { Dispatch, SetStateAction } from 'react';

type My_Type_Dispatch = React.Dispatch<Action>;

type _inc_Type ={
    seconds: number;
    dispatch: My_Type_Dispatch;
    colorText: string;
  }

export type My_Type_Level = {
    level: "easy"| "medium"| "hard";
}

export type My_Type_Img_Name = "blesk"| "drevo"| "kvapka"| "more"| "slnko"| "vesmir"| "vibracia"|"vietor";

export type My_Type_ImgCount = 5 | 6 | 7 | 8;

export type My_Type_Image = { 
  id: string;
  name: My_Type_Img_Name
};
  
export type MyTimeAndStartProps = _inc_Type & {
    isRunning: boolean;
    // setSeconds: number;
     setSeconds: Dispatch<SetStateAction<number>>;

  }

    export type MyGameDivPicturesProps= _inc_Type & My_Type_Level &{
    selectedImgCount: My_Type_ImgCount; 
  }

export type Encrypted = My_Type_Level & {
    imgCount: number;
    gameId: number
   };
