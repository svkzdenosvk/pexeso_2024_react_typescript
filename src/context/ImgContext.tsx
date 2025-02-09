import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { fetchOnlyImgNames } from "../_inc/data";
import { My_Type_Img_Name, UseContextProps, My_Type_Game_Settings } from "../_inc/my_types";
import { preloadImages  } from '../_inc/data';


 const ImgContext = createContext<UseContextProps>({ imgNames: [],  isLoading: true, seconds:0, setSeconds: () =>{}, settings: {} as My_Type_Game_Settings, setSettings: () =>{} });

export const ImgProvider =  ({ children }: { children: ReactNode }) => {
  const [imgNames, setImages] = useState<My_Type_Img_Name[]>([]);
  const [isLoading, setLoadingImg] = useState(true);
  let [seconds, setSeconds] = useState<number>(0);
  let [settings, setSettings] = useState<My_Type_Game_Settings>({} as My_Type_Game_Settings);

  
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

  return (
    <ImgContext.Provider value={{ imgNames, isLoading, seconds, setSeconds, settings, setSettings }}>
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


