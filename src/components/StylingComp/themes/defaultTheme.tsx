import { createTheme } from '@mui/material/styles';

import {sharedThemeStyles} from '@pexeso/components/StylingComp/SharedStyles'

export const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        text:{ primary:'#000000'},
        background: { default: '#ffffff' },       
      },
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: '#ffffff',          
            },
          },
        },
      },
    ...sharedThemeStyles
    
});