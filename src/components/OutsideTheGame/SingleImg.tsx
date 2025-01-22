import React, { useState, useEffect } from 'react';
import {useParams, Link} from "react-router-dom"
import './css/singleImg.css';
import { fetchImageNames } from '../../_inc/data';
import { My_Type_Img_Name } from '../../_inc/my_types';

let fetchedImageNamesAndId

fetchedImageNamesAndId = await fetchImageNames(); // waiting for img names array from firebase db

let allowedImageNames = fetchedImageNamesAndId.map(object => object.name) // return only name of picture

const isAllowedImageName_Type_Guard = (value: string): value is My_Type_Img_Name => {
  return allowedImageNames.includes(value as My_Type_Img_Name);
};

const SingleImg = () => {
  const [errorImgName, setErrorImgName] = useState(false);
  const [imgNameH1, setNameH1] = useState("");

  let imgName = useParams().name ?? "Error"; // --------------------------------if undefined -> "Error" string

  if (imgNameH1==="vesmir"){setNameH1("vesmír")}
  if (imgNameH1==="vibracia"){setNameH1("vibrácia")}
   
    useEffect(() => {
     // if (!allowedImageNames.includes(imgName)) {
        if (!isAllowedImageName_Type_Guard(imgName)){  
            setErrorImgName(true);
            setNameH1("Neexistujúci obrázok");
        } else {
            setErrorImgName(false);
            setNameH1(imgName);

        }
    }, [imgName]);

return (
  <div className="single-img-content">
      <h1>{imgNameH1.charAt(0).toUpperCase()+ imgNameH1.slice(1)}</h1>
      <div className="single-img-main-content">
      {errorImgName ? (//-------------------------------------------------------if loading show
          <div >
            <h1>Error, tento obrázok neexistuje</h1>  
            <Link to="/about-game/images">Klikni sem a poď na stránku obrázkov</Link>
          </div>
        ) : (
          // <div class="single-img-main-content-core">
          <>
            <img src={`../../pictures/pexeso/${imgName}.jpg`} alt="Pexeso img" />
            <Link className="link-back-to-images" to="/about-game/images">Späť na stránku obrázkov</Link>
          </>
          // {/* </div> */}
        )}
      </div>
  </div>
)
}

export default SingleImg