import React, { useState, useRef } from "react";
import { useEffect } from "react";

import "@pexeso/components/RelatedToGame/css/gameSettings.css";

import { useNavigate, useLocation } from "react-router-dom";

import {
  My_Type_ImgCount,
  My_Type_Level,
  My_Type_Svk_Eng_level,
} from "@pexeso/_inc/my_types";
import {
  my_Type_Guard_function,
  my_Type_Guard_function_number,
} from "@pexeso/_inc/_inc_functions";

import { useDispatch } from "react-redux";

import {
  settings_and_styling_before_start,
  reset_settings,
} from "@pexeso/store/reducers/gameSlice";
import { seconds_reset } from "@pexeso/store/reducers/secondsSlice";

const GameSettings = () => {
  //----------------------------redux

  const dispatch = useDispatch();

  //----------------------------useState

  const [levelChosen, setlevelChosen] = useState("" as My_Type_Level);
  // const [selectedImages, setSelectedImages] = useState([]); //--------------------choosen images
  const [imgCountChosen, setimgCountChosen] = useState(0 as My_Type_ImgCount); //----count of choosen images
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const location = useLocation(); // ------------------------------------------------watching URL

  useEffect(() => {
    dispatch(seconds_reset()); //----------------------------------------------------reset seconds
    dispatch(reset_settings()); //---------------------------------------------------reset settings
  }, [location.pathname, dispatch]); // ---------------------------------------------trigger when path change

  const imgCount_values: My_Type_ImgCount[] = [5, 6, 7, 8]; // ----------------------count of images for game

  const levels: My_Type_Svk_Eng_level[] = [
    { value: "easy", label: "Ľahký" },
    { value: "medium", label: "Stredný" },
    { value: "hard", label: "Ťažký" },
  ];

  const levels_values: My_Type_Level[] = ["easy", "medium", "hard"];

  // const imageOptions = ["vesmir", "kvapka", "more", "sun", "vibracia", "vietor", "drevo", "blesk"];

  // let levelChosen="";
  // let imgCountChosen=null;
  // const handleImageSelection = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedImages((prev) => [...prev, value]);
  //   } else {
  //     setSelectedImages((prev) => prev.filter((img) => img !== value));
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    /*-------------------after submit function */
    e.preventDefault();

    if (!my_Type_Guard_function(levelChosen, levels_values)) {
      setError("Nastav level obtiažnosti");
      return;
    } else if (
      !my_Type_Guard_function_number(imgCountChosen, imgCount_values)
    ) {
      setError("Nastav počet obrázkov, s ktorými chceš hrať.");
      return;
    } else {
      setError(""); //----------------------------------------------------------------reset error message
    }

    dispatch(
      settings_and_styling_before_start({
        //------------------------------------set mainly level and count of images to play with
        level: levelChosen as My_Type_Level,
        selectedImgCount: imgCountChosen as My_Type_ImgCount,
      }),
    );

    formRef.current?.reset();

    navigate(
      "/game",
    ); /*---------------------------------------------------------------navigate to save data in useContext*/
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h2>Nastavte parametre hry</h2>

      <fieldset>
        <legend>Vyberte úroveň obtiažnosti:</legend>
        {/* -------------------------------choose level */}
        {levels.map((level_name, index) => (
          <label key={index}>
            <input
              type="radio"
              name="level"
              value={level_name.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setlevelChosen(e.target.value as My_Type_Level)
              }
            />
            {level_name.label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Vyberte počet obrázkov:</legend>
        {/* ------------------------------------choose count of images to play*/}
        {imgCount_values.map((value, index) => (
          <label key={index}>
            <input
              type="radio"
              name="imageCount"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setimgCountChosen(parseInt(e.target.value) as My_Type_ImgCount)
              }
            />
            {value * 2}{" "}
            {/* ------------------------------------------------------------pair is 5 * 2 = 10) */}
          </label>
        ))}
      </fieldset>

      {/* Checklist of images
      <fieldset>
        <legend>Vyberte obrázky:</legend>
        {imageOptions.map((image) => (
          <label key={image}>
            <input
              type="checkbox"
              value={image}
              onChange={handleImageSelection}
            />
            {image}
          </label>
        ))}
      </fieldset> */}

      {
        error && (
          <p>{error}</p>
        ) /*-----------------------------------------------------error message */
      }

      <button type="submit">Hraj</button>
    </form>
  );
};

export default GameSettings;
