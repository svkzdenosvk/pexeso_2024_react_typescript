import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  My_Type_Img_Name,
  UseContextProps,
  My_Type_Color_Background,
} from "../_inc/my_types";
import { preloadImages, fetchOnlyImgNames } from "../_inc/data";

import SimpleCrypto from "simple-crypto-js"; //-------------------------------------this provide crypting and decrypting params in URL

const ImgContext = createContext<UseContextProps>({
  imgNames: [],
  isLoading: true,
  seconds: 0,
  setSeconds: () => {},
  simpleCrypto: {},
  bgColor: "white",
  setbgColor: () => {},
});

export const ImgProvider = ({ children }: { children: ReactNode }) => {
  const [imgNames, setImages] = useState<My_Type_Img_Name[]>([]);
  const [isLoading, setLoadingImg] = useState(true);
  let [seconds, setSeconds] = useState<number>(0);
  const [bgColor, setbgColor] = useState<My_Type_Color_Background>("white");

  const secretKey = "encryption-key-for-settings"; //----------------------------shared key on both sides ->to give it in the useContext
  const simpleCrypto = new SimpleCrypto(secretKey); //----------------------------shared SimpleCrypto object

  useEffect(() => {
    const fetchImgNamesFunc = async () => {
      try {
        const fetchedImgNames: My_Type_Img_Name[] = await fetchOnlyImgNames(); // --loading img names from firebase
        setImages(fetchedImgNames);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    fetchImgNamesFunc(); //--------------------------------------------------------to call async f.
  }, []);

  useEffect(() => {
    preloadImages(
      imgNames,
    ) /*--------------------------------------------------function to preload imgd */
      .then(() => {
        setLoadingImg(
          false,
        ); /*-----------------------------------------------set loading to false after imgs were loaded*/
      })
      .catch((err) => {
        // setError(err.message);    // save error message
        console.log("Not all images were loaded");
        // setLoadingImg(false);        //----------------------------------------set loading to false
      });
  }, [isLoading, imgNames]);

  useEffect(() => {
    //--------------------------------------------------------------check end useEffect
    document
      .getElementsByTagName("BODY")[0]
      .setAttribute("style", "background-color: " + bgColor);
  }, [bgColor]);

  return (
    <ImgContext.Provider
      value={{
        imgNames,
        isLoading,
        seconds,
        setSeconds,
        simpleCrypto,
        bgColor,
        setbgColor,
      }}
    >
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
