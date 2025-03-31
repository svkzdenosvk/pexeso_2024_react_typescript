
import { Middleware } from '@reduxjs/toolkit';
import { end_game } from '../store/reducers/gameSlice'; // -------- action

export const checkEndMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  // const result = next(action);

  const state = storeAPI.getState();
  const arrayLength = state.game.divImgs.length; 

  if (arrayLength === 0 && state.game.isRunning ) { //--------------when the game is running and all images are removed 
    storeAPI.dispatch(end_game());
  }

  // return result;
  return next(action);
};