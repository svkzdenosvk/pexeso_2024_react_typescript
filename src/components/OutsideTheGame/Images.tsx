import React from 'react'
import { Link } from "react-router-dom";
import './css/images.css';
import { My_Type_Redux_Root_State } from '../../_inc/my_types';

import {useSelector} from 'react-redux'

const uuid = require('uuid')

const Images = () => {
  
   // ---------------------------redux
 
   const { isLoading, imgNames } = useSelector((state: My_Type_Redux_Root_State) => state.game);//-------------with destructuring
   

    return (
      <div className="img-content">
        <h1>Hracie obrázky</h1>
        <div className="img-main-content">
          {(isLoading || imgNames.length===0)? (//----------------------------if loading show H1
              <h1>Načítavajú sa obrázky</h1>
          ):(//---------------------------------------------------------------if not loading (after successful l.) show
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