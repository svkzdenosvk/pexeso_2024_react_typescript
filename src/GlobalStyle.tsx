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

    #seconds,
    #start {
      padding: 20px;
      font-size: 300%;
      float: left;
      font-weight: bold;
    }

    #start {
      color: white;
      border-radius: 50%;
      background-color: #99103a;

      &:hover {
        color: #cc0606;
      }
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

    .end-game-btn {
      background-color: grey;
      max-width: 300px;
      border: none;
      color: white;
      font-weight: bold;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px auto;
      cursor: pointer;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s, transform 0.2s;
      align-items: center;
      justify-content: center;

      &:hover {
        color: goldenrod;
        background-color: #696969;
      }
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

    #levelBtns div {
      margin-top: 2%;
    }
  }
`;
