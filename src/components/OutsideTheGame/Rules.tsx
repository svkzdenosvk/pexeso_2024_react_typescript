import React from "react";
import styled from "styled-components";
import { MyMUIImg } from "@pexeso/components/SharedMUIElements/MyMUIImg";
import Typography from '@mui/material/Typography';

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 20px;
`;

const RulesMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 2%;
`;

const PrincipleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  line-height: 150%;

  p {
    margin-right: 5%;
    text-indent: 10%;
    max-width: 40%;
  }

  //  img {
  //    width: 200px;
  //    height: 130px;
  //    margin-right: 2%;
  //  }

  @media (max-width: 1339px) {
    justify-content: space-evenly;
  }

  @media (max-width: 1105px) {
    justify-content: start;
    p {
      max-width: 60%;
    }
  }

  @media (max-width: 994px) {
    p {
      margin-right: 2%;
      max-width: 60%;
    }
  }

  @media (max-width: 902px) {
    p {
      margin-right: 0%;
    }
  }

  @media (max-width: 860px) {
    p {
      margin-right: 5%;
      max-width: 50%;
    }
  }

  @media (max-width: 750px) {
    p {
      max-width: 40%;
      margin-right: 3%;
    }
  }
`;

const LevelSection = styled.div`
  line-height: 150%;

  ul {
    list-style-type: none;
    padding-left: 2%;
  }

  li {
    margin-bottom: 2%;
    width: 90%;
    position: relative;
    padding-left: 1.5em;

    &::before {
      content: "✽\00a0\00a0\00a0\00a0"; /* own symbol with non breaking spaces */
      position: absolute;
      left: 0;
    }
  }

  @media (max-width: 1105px) {
    ul {
      padding-left: 0%;
    }
  }
`;
const imgStyles = {
  width: "200px",
  height: "130px",
  marginRight: "2%",
 
} as const;

const Rules = () => {
  return (
    <Wrapper>
      <Typography variant="h2" component="h2" > {/*originally h1 */}
         Pravidlá
      </Typography>
      <RulesMain>
        <Typography variant="h4" component="h4" > {/*originally h2 */}
          Princíp
        </Typography>
        <PrincipleSection>
           <p>Hľadať zhodný pár obrázkov pod obrázkom jokera.</p>

           <MyMUIImg sx={imgStyles} src="/pictures/joker.jpg"/>
        </PrincipleSection>
        <Typography variant="h4" component="h4" > {/*originally h2 */}
          Nastavenie levelu obtiažnosti
        </Typography>
        <LevelSection>
          <ul>
            <li>
              <b>Ľahký</b> - obrázky sa nemiešajú, ale uhádnuté sa vymažú a
              zvyšné sa posúvajú k sebe
            </li>
            <li>
              <b>Stredný</b> - usporiadanie obrázkov sa mieša po každej
              neuhádnutej dvojici
            </li>
            <li>
              <b>Ťažký</b> - usporiadanie obrázkov sa mieša takmer každú sekundu
            </li>
          </ul>
        </LevelSection>
      </RulesMain>
    </Wrapper>
  );
};

export default Rules;
