import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-align: center;
    overflow-x: hidden;
  }

  body {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    min-height: 100vh;
    transition: background-color 0.5s ease, color 0.5s ease;
  }

  #result {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #timeAndStart {
    display: flex;

    #seconds {
      padding: 20px;
      font-size: 300%;
      float: left;
      font-weight: bold;
    }
  }

  .welcome {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: calc(2rem + 5vw);
      margin-bottom: 70px;
    }

    h3 {
      text-align: center;
    }
  }

  .column_content {
    max-width: 850px;
    display: none;
    flex-direction: column;
    justify-content: space-evenly;

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: wrap;
      flex: 50%;
      margin-top: 1.5%;

      .mask {
        // background-image: url("../public/pictures/joker.jpg"); 
        background-image: url("/pictures/joker.jpg");

        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 100%;
        cursor: pointer;
      }

      .div_on_click {
        margin: 2%;
        width: 107px;
        height: 107px;
      }

      img {
        width: 107px;
        height: 107px;
        opacity: 0%;
      }
    }
  }

  .div_center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .column_content .row .selected_Div_img {
    pointer-events: none;

    img {
      opacity: 100%;
    }
  }

  .rotate-center {
    animation: rotate-center 0.2s ease-in-out both;
    box-shadow: 0px 0px 28px 29px rgba(255, 255, 0, 0.53);
  }

  @keyframes rotate-center {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media screen and (min-width: 1650px) {
    #result {
      text-align: center;
      align-items: center;
    }

    .welcome {
      width: 1650px;
    }
  }

  @media screen and (max-width: 540px) {
    .welcome h1 {
      margin-bottom: 0px;
    }

    // #levelBtns div {
    //   margin-top: 2%;
    // }
  }
`;
