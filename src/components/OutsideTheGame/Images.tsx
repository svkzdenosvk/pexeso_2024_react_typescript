import React from 'react'
import { Link } from "react-router-dom";
import {  useEffect, useState } from "react";
import './css/images.css';
import { preloadImages  } from '../../_inc/data';
import {  ImgNamesinProps } from '../../_inc/my_types';

const uuid = require('uuid')

const Images = ({imgNames}:ImgNamesinProps) => {
  const [loadingImg, setLoadingImg] = useState(true);
  // const [renderedImgNamesArr, setRenderedImgs] = useState([]);

    useEffect(() => {

      preloadImages(imgNames)
        // .then((loadedDivItems) => {
          .then(() => {
           // setRenderedImgs(loadedDivItems)

          setLoadingImg(false);      //-------------------------------------------set loading to false
        })
        .catch((err) => {
        // setError(err.message);    // save error message
        console.log("Not all images were loaded")
        // setLoadingImg(false);        //----------------------------------------set loading to false
       
        });
    }, [loadingImg, imgNames]);
    
    return (
      <div className="img-content">
        <h1>Hracie obrázky</h1>
        <div className="img-main-content">
          {loadingImg ? (//-------------------------------------------------------if loading show
            <div className="loading">
              <h1>Nacítavajú sa obrázky</h1>
            </div>
          ) : (//-----------------------------------------------------------------if not loading (after successful l.) show
            imgNames.map((oneImgName) => (
              <div className="" key={uuid.v4()}>
                <Link to={`/about-game/images/${oneImgName}`}>
                  <img src={`../pictures/pexeso/${oneImgName}.jpg`} alt="Pexeso img" />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    );
    
}

export default Images