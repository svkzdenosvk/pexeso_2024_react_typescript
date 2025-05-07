import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    // padding: 0;
    // margin: 0;
    // box-sizing: border-box;
    // text-align: center;
     overflow-x: hidden;
  }

  body {
    // padding: 0px;
    // margin: 0px;
    // box-sizing: border-box;
    // min-height: 100vh;
     transition: background-color 1.5s ease, color 0.5s ease;
  }

  #result {
    // margin: 0;
    // padding: 0;
    // box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .welcome {
    
    h1 {
      font-size: calc(2rem + 5vw);
      margin-bottom: 70px;
    }

    h3 {
      //  text-align: center;
    }
  }

  .column_content {
    
    .row {
     
      .mask {
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

  }

  @media screen and (max-width: 540px) {
    .welcome h1 {
      margin-bottom: 0px;
    }

    
  }
    //---------------------------------------------outside the game
    .mainContentAbout h2{
    
      text-align: center;
       width: 70vw;

      @media (max-width: 600px) {
        //  width: 100%;
         width: 100vw;

      }
  
    }
`;
