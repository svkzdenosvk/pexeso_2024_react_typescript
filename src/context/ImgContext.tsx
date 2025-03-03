import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { fetchOnlyImgNames, preloadImages } from "../_inc/data";
import { My_Type_Img_Name, /*UseContextProps, My_Type_Game_Settings, */My_Type_Color_Background } from "../_inc/my_types";


 const ImgContext = createContext</*UseContextProps*/>({
   imgNames: [],  isLoading: true, seconds:0, setSeconds: () =>{},
  //  settings: {} as My_Type_Game_Settings, setSettings: () =>{},
   bgColor:"white", setbgColor:() =>{} });

export const ImgProvider =  ({ children }: { children: ReactNode }) => {
  const [imgNames, setImages] = useState<My_Type_Img_Name[]>([]);
  const [isLoading, setLoadingImg] = useState(true);
  let [seconds, setSeconds] = useState<number>(0);
  // let [settings, setSettings] = useState<My_Type_Game_Settings>({} as My_Type_Game_Settings);
  const [bgColor, setbgColor] = useState<My_Type_Color_Background>("white");

  
  useEffect(() => {
    const fetchImgNamesFunc = async () => {
      try {
        const fetchedImgNames:My_Type_Img_Name[] = await fetchOnlyImgNames(); // --loading img names from firebase
        setImages(fetchedImgNames)
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    fetchImgNamesFunc(); //--------------------------------------------------------to call async f.
  }, []);  

  useEffect(() => {
  
        preloadImages(imgNames)/*--------------------------------------------------function to preload imgd */
          .then(() => {
  
            setLoadingImg(false); /*-----------------------------------------------set loading to false after imgs were loaded*/
          })
          .catch((err) => {
          // setError(err.message);    // save error message
          console.log("Not all images were loaded")
          // setLoadingImg(false);        //----------------------------------------set loading to false
         
          });
      }, [isLoading, imgNames]);

      useEffect(() => {  //--------------------------------------------------------------check end useEffect
        document.getElementsByTagName("BODY")[0].setAttribute('style', 'background-color: '+ bgColor);
          
      }, [bgColor])

  return (
    <ImgContext.Provider value={{ imgNames, isLoading, seconds, setSeconds, settings, setSettings, bgColor, setbgColor }}>
      {children}
    </ImgContext.Provider>
  );
};

export const useImgContext = () => {
  const context = useContext(ImgContext);
  if (!context) {
    throw new Error("useImgContext must be used within an ImgProvider");
  }
  return context;
};


