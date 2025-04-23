// GameSettings.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import {
  settings_and_styling_before_start,
  reset_settings,
} from "@pexeso/store/reducers/gameSlice";
import { seconds_reset } from "@pexeso/store/reducers/secondsSlice";
import {
  My_Type_ImgCount,
  My_Type_Level,
  My_Type_Svk_Eng_level,
} from "@pexeso/_inc/my_types";
import {
  my_Type_Guard_function,
  my_Type_Guard_function_number,
} from "@pexeso/_inc/_inc_functions";

const pulseShadow = keyframes`
  0% { box-shadow: 0 2px 0px white; }
  50% { box-shadow: 0 6px 10px goldenrod; }
  100% { box-shadow: 0 2px 0px white; }
`;

const Form = styled.form`
  min-width: 350px;
`;

const Fieldset = styled.fieldset`
  border-radius: 25px;
  & + & { margin-top: 10px; }
`;

const Legend = styled.legend`
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const SubmitButton = styled.button`
  text-decoration: none;
  border: none;
  background: transparent;
  color: black;
  margin-top: 10px;
  font-weight: bold;
  padding: 10px 25px;
  display: inline-block;
  border-radius: 25px;
  animation: ${pulseShadow} 1.5s infinite ease-in-out;

  &:hover {
    color: goldenrod;
    transition: color 0.3s ease;
    box-shadow: 0px 7px 10px grey;
  }
`;

const GameSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);

  const [levelChosen, setLevelChosen] = useState("" as My_Type_Level);
  const [imgCountChosen, setImgCountChosen] = useState(0 as My_Type_ImgCount); //----count of choosen images
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(seconds_reset());
    dispatch(reset_settings());
  }, [location.pathname, dispatch]);

  const imgCountValues: My_Type_ImgCount[] = [5, 6, 7, 8];
  const levels: My_Type_Svk_Eng_level[] = [
    { value: "easy", label: "Ľahký" },
    { value: "medium", label: "Stredný" },
    { value: "hard", label: "Ťažký" },
  ];
  const levelValues: My_Type_Level[] = ["easy", "medium", "hard"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!my_Type_Guard_function(levelChosen, levelValues)) {
      setError("Nastav level obtiažnosti");
      return;
    }
    if (!my_Type_Guard_function_number(imgCountChosen, imgCountValues)) {
      setError("Nastav počet obrázkov, s ktorými chceš hrať.");
      return;
    }
    setError("");

    dispatch(
      settings_and_styling_before_start({
        level: levelChosen,
        selectedImgCount: imgCountChosen,
      })
    );
    formRef.current?.reset();
    navigate("/game");
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <h2>Nastavte parametre hry</h2>

      <Fieldset>
        <Legend>Vyberte úroveň obtiažnosti:</Legend>
        {levels.map((lvl, i) => (
          <label key={i}>
            <input
              type="radio"
              name="level"
              value={lvl.value}
              onChange={(e) =>
                setLevelChosen(e.target.value as My_Type_Level)
              }
            />
            {lvl.label}
          </label>
        ))}
      </Fieldset>

      <Fieldset>
        <Legend>Vyberte počet obrázkov:</Legend>
        {imgCountValues.map((cnt, i) => (
          <label key={i}>
            <input
              type="radio"
              name="imageCount"
              value={cnt}
              onChange={(e) =>
                setImgCountChosen(parseInt(e.target.value) as My_Type_ImgCount)
              }
            />
            {cnt * 2}
          </label>
        ))}
      </Fieldset>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit">Hraj</SubmitButton>
    </Form>
  );
};

export default GameSettings;
