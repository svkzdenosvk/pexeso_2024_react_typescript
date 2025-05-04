import { createTheme } from '@mui/material/styles';

import {sharedThemeStyles} from '@pexeso/components/StylingComp/SharedStyles'

export const hardTheme = createTheme({
    palette: {
        mode: 'dark',
        text:{ primary:'#ffffff'},
        background: { default: 'black' },       // tiež môžeš nastaviť paletu
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: 'black',          // pozadie tela
            },
            '.clorTextTheme':{
              color: 'white !important',   
            },
          },
        },
      },
    ...sharedThemeStyles
    
});