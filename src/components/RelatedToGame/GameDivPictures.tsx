import React from 'react';

import { useReducer, useEffect, useCallback } from "react";

import { _shuffleArray, _fmtMSS } from '../../_inc/_inc_functions';

import { fetchImageDivsForCounts  } from '../../_inc/data';
import { MyGameDivPicturesProps, My_Type_UseReducer_GameDivPicture_State, My_Type_DivImg, My_Type_UseReducer_GameDivPicture_Action } from '../../_inc/my_types';


const reducerImg = (stateImg: My_Type_UseReducer_GameDivPicture_State, action: My_Type_UseReducer_GameDivPicture_Action) => {
  switch (action.type) {

    case 'HARDEST_LEVEL_SHUFFLE':
      _shuffleArray(stateImg.divImgs)

      return { 
        ...stateImg,
        divImgs: stateImg.divImgs
      } 
    case 'SHOW_ONE':

      let filteredArr: My_Type_DivImg[] =stateImg.divImgs.map(oneDiv => {
          if (oneDiv.id === action.payload.id) {
  
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
            ] }
          } else {
            return oneDiv; //--------------------------------------------------return untouched object
          }
        });
      
      return { 
        ...stateImg,
        divImgs: filteredArr
      } 
    case 'UN_MATCH':
      let afterUnMatchArr: My_Type_DivImg[] = stateImg.divImgs.map(oneDiv => {
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
        ...stateImg,
        divImgs: afterUnMatchArr
      }
    case 'MATCH':
        let afterMatchArr = stateImg.divImgs.map(oneDiv => {
          if (oneDiv.classNames.includes("selected_Div_img")) {
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center" /* remove selected and add rotate */
            ] }/*--------------------------------------------------------------change 2 selected img´s to nonselected and hide */
          } else {
            return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
          }
        });

      return { 
        ...stateImg,
        divImgs: afterMatchArr
      }
    case 'REMOVE_AFTER_MATCH':
     
      let afterAfterMatchArr = stateImg.divImgs.filter(oneDiv => !oneDiv.classNames.includes("rotate-center"));

      let checkIsEnd=false

      if(afterAfterMatchArr.length===0){
         checkIsEnd = true
      }
      return { 
        ...stateImg,
        divImgs: afterAfterMatchArr,
        isEnd: checkIsEnd
      }  
    case 'SELECTED_IMG_COUNT':

      return { 
        ...stateImg,
        divImgs: action.payload,
        isLoaded:false

      } 
    default:
      return stateImg;
  }
}

const defaultStateImg: My_Type_UseReducer_GameDivPicture_State  = {
  isLoaded:true,
  divImgs:[] as My_Type_DivImg[],
  isEnd:false

}

  export const GameDivPictures = ({dispatch, seconds, colorText, level, selectedImgCount,imgNames }:MyGameDivPicturesProps) =>{
  
    // ---------------------------useReducer

  const [stateImg , dispatchImg] = useReducer<React.Reducer<My_Type_UseReducer_GameDivPicture_State, My_Type_UseReducer_GameDivPicture_Action>
>(reducerImg, defaultStateImg);

  useEffect(() => {
    const fetchDivItemsWithCount = async () => {
      try {
        const imgDivs = await fetchImageDivsForCounts(selectedImgCount,imgNames); // --loading from firebase

        dispatchImg({type: "SELECTED_IMG_COUNT",payload: imgDivs })

      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchDivItemsWithCount(); //-----------------------------------------------to call async f.
  }, [selectedImgCount, imgNames]); // 

  // ---------------------------
  // ---------------------------ending fn
  // ---------------------------

  const checkEnd = useCallback(() => { /*---------------------------------------------------check if is end == each picture removed */
     
        if(stateImg.isEnd){

          dispatch({type: "SET_STOP_GAME" })/*----------------------------------------------stop increment seconds */

          document.getElementById("seconds")?.setAttribute("style", "display: none;");

          let endTime=_fmtMSS(seconds);/*---------------------------------------------------formating time */

          //  document.getElementsByTagName("BODY")[0].firstElementChild?.classList.add('div_center');/*start ---animation of gratulation text */
           document.getElementById("result")?.setAttribute("style", "justify-content: center;");
          let timeArr=endTime.split(":");/*-------------------------------------------------split time string (seconds:minutes) to array for separate minutes and second in gratulation text */
          
          let h1
          if (!document.querySelector('h1')) {
             h1 = document.createElement('h1');
             h1.style.color = colorText;

             document.getElementsByClassName("welcome")[0].appendChild(h1);  
          }else{
             h1=document.querySelector('h1')
          }
          
          if(h1){
           h1.innerHTML = "Gratulácia, vyhrali ste za "+(timeArr[0]==="0"?"":timeArr[0]+"m")+" "+ timeArr[1]+"s";
          }

      }else return
  }, [seconds, dispatch, colorText, stateImg.isEnd ]); // adding dependencies

  // ---------------------------
  // ---------------------------fn´s to show div>imgs
  // ---------------------------

  function showImg(element:HTMLDivElement,divObject:My_Type_DivImg){

    let selectedArr = stateImg.divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
    let rotateddArr = stateImg.divImgs.filter(oneDiv => oneDiv.classNames.includes("rotate-center")); /* after match */

    if(element.classList.contains('mask')&& (selectedArr.length===0||selectedArr.length===1)&&(rotateddArr.length===0)){/*-------------if divImg is not selected + prevent 3 imgs show*/
       dispatchImg({type: "SHOW_ONE", payload: divObject })
    }
  }

  useEffect(() => {

    setTimeout(function(){
          
          let  selectedArr: My_Type_DivImg[] = stateImg.divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
        
            if (selectedArr.length===2){
              //  document.body.style.pointerEvents = "none"//;---------------------------prevent to show third image 
              if (selectedArr[0].name=== selectedArr[1].name){/* if match */

              // setTimeout(() => {
                dispatchImg({type: "MATCH" })
              // }, 200);
                
                void document.body.offsetHeight; // ------------------------------------- reflow -> help from chat GPT to support animation 

                setTimeout(() => {
             
                  dispatchImg({type: "REMOVE_AFTER_MATCH" })
                  // document.body.style.pointerEvents = "auto"//;------------------------prevent to show third image 

                }, 200);

                      
              }else {/* -------------------------------------------------------------------if unmatch */
               
                dispatchImg({type: "UN_MATCH",payload:level })           
              }
            }

            document.body.style.pointerEvents = "auto";/*-------------------------------------------give back functionality to pointer*/

    }, 200);

    if (level === "hard") {//---------------------------------------------------------------------in the hardest level shuffeling every 400 ms
      const intervalShuffleHardest = setInterval(() => {
        dispatchImg({ type: "HARDEST_LEVEL_SHUFFLE" });
      }, 400);
  
      return () => clearInterval(intervalShuffleHardest);
    }
    
  }, [stateImg.divImgs,checkEnd,level])

  useEffect(() => {  
    checkEnd()
  }, [checkEnd,stateImg.isEnd])

  return (
     <div className="row" id="row">

        {stateImg.divImgs.map((oneDiv:My_Type_DivImg) => (      //--------------------------array of img names -> div>img

          <div  key={oneDiv.id} 
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  const currentDiv = e.currentTarget; // this is always <div> with `div_on_click`
                  showImg(currentDiv, oneDiv);
                }} 
                className={oneDiv.classNames.join(' ') + ' div_on_click'} >
       
                <img  src={"/pictures/pexeso/"+oneDiv.name+".jpg"} alt='Smiley face' />  

          </div> 

        ))}
     </div>
  );
}
  
 