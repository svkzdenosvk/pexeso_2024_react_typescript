import React from 'react';

import {  useEffect, useCallback } from "react";

import {  _fmtMSS } from '../../_inc/_inc_functions';

import { fetchImageDivsForCounts  } from '../../_inc/data';
import { My_Type_DivImg } from '../../_inc/my_types';
import { RootState } from "../../store/store"; 
import { after_settings_selected_img_count, showOne,match, remove_after_match,
         un_match, hardest_level_shuffle } from "../../store/reducers/gameSlice"; 

import {useSelector, useDispatch} from 'react-redux'


  export const GameDivPictures = () =>{
  
    // ---------------------------redux 
    
    const seconds = useSelector((state: RootState) => state.time.seconds);//-------------with destructuring
    const { imgNames, divImgs, selectedImgCount, level, isLoading, colorText, isEnd } = useSelector((state: RootState) => state.game);//-------------with destructuring

    const dispatch = useDispatch();
      
      
  useEffect(() => {
    const fetchDivItemsWithCount = async () => {
      try {
        
        const imgDivs: My_Type_DivImg[] = await fetchImageDivsForCounts(selectedImgCount,imgNames); // --loading from firebase

        dispatch(after_settings_selected_img_count(imgDivs))

      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchDivItemsWithCount(); //-------------------------------------------------to call async f.
  }, [ selectedImgCount, dispatch, imgNames]); // 

  // ---------------------------
  // ---------------------------ending fn
  // ---------------------------

  const checkEnd = useCallback(() => { /*----------------------------------------check if is end == each picture removed */
     
        if(isEnd){

          document.getElementById("seconds")?.setAttribute("style", "display: none;");

          let endTime=_fmtMSS(seconds);/*----------------------------------------formating time */

          //  document.getElementsByTagName("BODY")[0].firstElementChild?.classList.add('div_center');/*start ---animation of gratulation text */
           document.getElementById("result")?.setAttribute("style", "justify-content: center;");
          let timeArr=endTime.split(":");/*---------------------------------------split time string (seconds:minutes) to array for separate minutes and second in gratulation text */
          
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
  }, [seconds, colorText, isEnd ]); //-------------------------------------------adding dependencies


  function showImg(element:HTMLDivElement,divObject:My_Type_DivImg){  // --------fn to show div>img

    let selectedArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
    let rotateddArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("rotate-center")); /* after match */

    if(element.classList.contains('mask')&& (selectedArr.length===0||selectedArr.length===1)&&(rotateddArr.length===0)){/*-------------if divImg is not selected + prevent 3 imgs show*/

       dispatch(showOne(divObject))

    }
  }

  useEffect(() => {

    setTimeout(function(){
          
          let  selectedArr: My_Type_DivImg[] = divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
        
            if (selectedArr.length===2){

              if (selectedArr[0].name=== selectedArr[1].name){/* if match */

                dispatch(match())
                           
                void document.body.offsetHeight; // -------------------------------reflow -> help from chat GPT to support animation 

                setTimeout(() => {
             
                  dispatch(remove_after_match())

                }, 200);

                      
              }else {/* -----------------------------------------------------------if unmatch */
               
                dispatch(un_match(level))
         
              }
            }

            document.body.style.pointerEvents = "auto";/*---------------------------give back functionality to pointer*/

    }, 200);

    if (level === "hard") {//-------------------------------------------------------in the hardest level shuffeling every 400 ms
      const intervalShuffleHardest = setInterval(() => {
        dispatch(hardest_level_shuffle())

      }, 400);
  
      return () => clearInterval(intervalShuffleHardest);
    }
    
  }, [dispatch,divImgs,checkEnd,level])

  useEffect(() => {  //--------------------------------------------------------------check end useEffect
    checkEnd()
  }, [checkEnd,isEnd])

  return (
     <div className="row" id="row">
     {isLoading ? (//----------------------------------------------------------------if loading is done show
        <h1 style={{color: colorText}} >Načítavajú sa obrázky</h1>
      ) : (//-------------------------------------------------------------------------if not loading (after successful l.) show
        divImgs.map((oneDiv:My_Type_DivImg) => ( //-----------------------------------array of img names -> div>img

          <div  key={oneDiv.id} 
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  const currentDiv = e.currentTarget; // -----------------------------this is always <div> with `div_on_click`
                  showImg(currentDiv, oneDiv);
                }} 
                className={oneDiv.classNames.join(' ') } >

                <img  src={"/pictures/pexeso/"+oneDiv.name+".jpg"} alt='Smiley face' />  

          </div> 

        ))
      )}
     </div>
  );
}
  
 