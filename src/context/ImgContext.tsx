import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { fetchOnlyImgNames } from "../_inc/data";
import { My_Type_Img_Name, ImgNamesinProps } from "../_inc/my_types";

// type ImgContextType = {
//   imgNames: My_Type_Img_Name[];
// };

//  const ImgContext = createContext<ImgNamesinProps | undefined>(undefined);
// const ImgContext = createContext<ImgNamesinProps >([] as My_Type_Img_Name[]);

 const ImgContext = createContext<ImgNamesinProps>({ imgNames: [] });


export const ImgProvider =  ({ children }: { children: ReactNode }) => {
  const [imgNames, setImages] = useState<My_Type_Img_Name[]>([]);

  useEffect(() => {
    const fetchImgNamesFunc = async () => {
      try {
        const fetchedImgNames:My_Type_Img_Name[] = await fetchOnlyImgNames(); // --loading from firebase
        setImages(fetchedImgNames)
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    fetchImgNamesFunc(); //-----------------------------------------------to call async f.
  }, []); // 

  return (
    <ImgContext.Provider value={{ imgNames }}>
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
