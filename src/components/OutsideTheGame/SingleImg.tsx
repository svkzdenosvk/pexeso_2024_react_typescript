import React, { useState, useEffect } from 'react';
import {useParams, Link} from "react-router-dom"
import './css/singleImg.css';
import { my_Type_Guard_function } from '../../_inc/_inc_functions';
import {  My_Type_Redux_Root_State } from '../../_inc/my_types';


import {useSelector} from 'react-redux'


const SingleImg = () => {

  // ---------------------------redux

  const imgNames = useSelector((state: My_Type_Redux_Root_State) => state.game.imgNames);

  // ---------------------------useState

  const [errorImgName, setErrorImgName] = useState(false);
  const [imgNameH1, setNameH1] = useState("");

  let imgName = useParams().name ?? "Error"; // --------------------------------if undefined -> "Error" string

  if (imgNameH1==="vesmir"){setNameH1("vesmír")}
  if (imgNameH1==="vibracia"){setNameH1("vibrácia")}
   
    useEffect(() => {
         if (!my_Type_Guard_function(imgName,imgNames)){  

            setErrorImgName(true);
            setNameH1("Neexistujúci obrázok");
        } else {
            setErrorImgName(false);
            setNameH1(imgName);

        }
    }, [imgName,imgNames]);

return (
  <div className="single-img-content">
      <h1>{imgNameH1.charAt(0).toUpperCase()+ imgNameH1.slice(1)}</h1>
      <div className="single-img-main-content">
      {errorImgName ? (//-------------------------------------------------------if name of img not exists in db
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