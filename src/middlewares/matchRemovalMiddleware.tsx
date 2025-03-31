
import { Middleware } from '@reduxjs/toolkit';
import { remove_after_match, match } from '../store/reducers/gameSlice';

export const matchRemovalMiddleware: Middleware<{}> = (storeAPI) => (next) => (action) => {
    
//   if (action.type === 'game/match') {
//   if (action.type === match.type) {
   if (typeof action === 'object' && action !== null && 'type' in action && action.type === match.type) {

    next(action); // -----------------------------------------------------------firstly trigger match action

    void document.body.offsetHeight;
    setTimeout(() => {
        storeAPI.dispatch(remove_after_match());//------------------------------ after match remove pictures (it´s about animations)
    }, 200);
  } else {
    next(action);
  }
};

// export default matchRemovalMiddleware;
