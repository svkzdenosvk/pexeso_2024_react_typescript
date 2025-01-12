import React from 'react'
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './css/sharedAboutLayout.css';

const SharedAboutLayout = () => {
  return (
    <>
        <div className="navigation-sharedAboutLayout">
            <nav>
                <NavLink to="/about-game/rules">Pravidlá</NavLink>   

                <NavLink to="/about-game/images">Obrazky</NavLink>   
            </nav>
        </div>
       {/* <div class="content-sharedAboutLayout"></div>  */}
        <div className="main-content-sharedAboutLayout">

          <Outlet /> 

        </div>
    </>

  )
}

export default SharedAboutLayout