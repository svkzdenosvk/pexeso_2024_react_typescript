import { Dispatch, SetStateAction } from 'react';

type My_Type_Dispatch = React.Dispatch<Action>;

type _inc_Type ={
    seconds: number;
    dispatch: My_Type_Dispatch;
    colorText: string;
}

export type MyTimeAndStartProps = _inc_Type & {
    isRunning: boolean;
    // setSeconds: number;
     setSeconds: Dispatch<SetStateAction<number>>;

  }

  //export type MyGameDivPicturesProps= _inc_Type &{
    export type MyGameDivPicturesProps= _inc_Type & {

    level: string; //tu budu presne typy
    selectedImgCount: number //aj tu budu presne moznosti 
  }
