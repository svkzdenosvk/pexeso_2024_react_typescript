import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route /*, Navigate*/ } from "react-router-dom";
import Game from "@pexeso/components/RelatedToGame/Game";
import SharedLayout from "@pexeso/components/OutsideTheGame/SharedLayout";
import Home from "@pexeso/components/OutsideTheGame/Home";
import GameSettings from "@pexeso/components/RelatedToGame/GameSettings";
import Rules from "@pexeso/components/OutsideTheGame/Rules";
import SharedAboutLayout from "@pexeso/components/OutsideTheGame/SharedAboutLayout";
import AboutGame from "@pexeso/components/OutsideTheGame/AboutGame";
import Images from "@pexeso/components/OutsideTheGame/Images";
import SingleImg from "@pexeso/components/OutsideTheGame/SingleImg";
import ErrorPage from "@pexeso/components/ErrorPage";

import { My_Type_Redux_Root_State } from "./_inc/my_types";

import { fetchOnlyImgNames, preloadImages } from "./_inc/data";

import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const imgNames = useSelector(
    (state: My_Type_Redux_Root_State) => state.game.imgNames,
  );
  const isLoading = useSelector(
    (state: My_Type_Redux_Root_State) => state.game.isLoading,
  );
  const bgColor = useSelector(
    (state: My_Type_Redux_Root_State) => state.game.bgColor,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImgNamesFunc = async () => {
      try {
        let fetchedImgNames = await fetchOnlyImgNames(); // --loading img names from firebase

        dispatch({ type: "SET_IMG_NAMES", payload: fetchedImgNames });
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    fetchImgNamesFunc(); //--------------------------------------------------------to call async f.
  }, [dispatch]);

  useEffect(() => {
    preloadImages(
      imgNames,
    ) /*--------------------------------------------------function to preload imgd */
      .then(() => {
        dispatch({
          type: "SET_LOADING",
        }); /*-------------------------------------set loading to false after imgs were loaded*/
      })
      .catch((err) => {
        // setError(err.message);    // save error message
        console.log("Not all images were loaded");
        // setLoadingImg(false);        //----------------------------------------set loading to false
      });
  }, [isLoading, imgNames, dispatch]);

  useEffect(() => {
    //--------------------------------------------------------------check end useEffect
    document
      .getElementsByTagName("BODY")[0]
      .setAttribute("style", "background-color: " + bgColor);
  }, [bgColor]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game />} />

        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<GameSettings />} />

          <Route path="/about-game" element={<SharedAboutLayout />}>
            <Route index element={<AboutGame />} />
            <Route path="/about-game/rules" element={<Rules />} />

            <Route path="/about-game/images" element={<Images />} />
            <Route path="/about-game/images/:name" element={<SingleImg />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
