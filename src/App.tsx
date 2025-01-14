import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Game from "./components/RelatedToGame/Game.tsx"
import SharedLayout from "./components/OutsideTheGame/SharedLayout.tsx"
import Home from "./components/OutsideTheGame/Home.tsx"
import Settings from "./components/RelatedToGame/GameSettings.tsx"
import Rules from "./components/OutsideTheGame/Rules.tsx"
import SharedAboutLayout from "./components/OutsideTheGame/SharedAboutLayout.tsx"
import AboutGame from "./components/OutsideTheGame/AboutGame.tsx"
import Images from "./components/OutsideTheGame/Images.tsx"
import SingleImg from "./components/OutsideTheGame/SingleImg.tsx"

import ErrorPage from "./components/ErrorPage.tsx"


const App = () => {
  return (
    
    <BrowserRouter>
        <Routes>
             <Route path="/game/:settings?" element={<Game/>}/>

             <Route path="/" element={<SharedLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/settings" element={<Settings/>}/>
                
                <Route path="/about-game" element={<SharedAboutLayout />}>
                  <Route index element={<AboutGame />}/>
                  <Route path="/about-game/rules" element={<Rules />} />    
                  <Route path="/about-game/images" element={<Images />} />  
                  <Route path="/about-game/images/:name" element={<SingleImg/>}/>
                </Route>                  
             </Route>

             <Route path="*" element={<ErrorPage/>}/>

        </Routes>
    </BrowserRouter>

  )
}

export default App