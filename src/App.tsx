import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import { fetchOnlyImgNames, preloadImages } from "@pexeso/_inc/data";

import { RootState } from "@pexeso/store/store";

import { useSelector, useDispatch } from "react-redux";
import { set_img_names, set_loading } from "@pexeso/store/reducers/gameSlice";

const App = () => {
  //----------------------------redux

  const { imgNames, isLoading, bgColor } = useSelector(
    (state: RootState) => state.game,
  ); //---with destructuring

  const dispatch = useDispatch();
  //------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchImgNamesFunc = async () => {
      try {
        let fetchedImgNames = await fetchOnlyImgNames(); // ----------------------loading img names from firebase

        dispatch(set_img_names(fetchedImgNames));
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    fetchImgNamesFunc(); //--------------------------------------------------------to call async f.
  }, [dispatch]);

  useEffect(() => {
    preloadImages(
      imgNames,
    ) /*---------------------------------------------------------------------------function to preload imgd */
      .then(() => {
        dispatch(
          set_loading(),
        ); /*----------------------------------------------------------------------set loading to false after imgs were loaded*/
      })
      .catch((err) => {
        // setError(err.message);    // save error message
        console.log("Not all images were loaded");
        // setLoadingImg(false);        //-----------------------------------------set loading to false
        window.location.reload(); //-----------------------------------------------reload page when imgs weren´t loaded correctly
      });
  }, [isLoading, imgNames, dispatch]);

  useEffect(() => {
    //-----------------------------------------------------------------------------check end useEffect
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
