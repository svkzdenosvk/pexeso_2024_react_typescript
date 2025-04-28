//pulse button
import { keyframes } from '@mui/system';

export const pulseShadow = keyframes`
  0% { box-shadow: 0 2px 0px white; }
  50% { box-shadow: 0 6px 10px goldenrod; }
  100% { box-shadow: 0 2px 0px white; }
`;

export const pulsatingButtonStyles = {
  textDecoration: 'none',
  width:'50%',
  border: 'none',
  background: 'transparent',
  color: 'black',
  margin: '10px auto',
  fontWeight: 'bold',
  padding: '10px 25px',
  display: 'inline',
  borderRadius: '25px',
  animation: `${pulseShadow} 1.5s infinite ease-in-out`,
  '&:hover': {
    color: 'goldenrod',
    transition: 'color 0.3s ease',
    boxShadow: '0px 7px 10px grey',
  },
};

//game link button (grey)
