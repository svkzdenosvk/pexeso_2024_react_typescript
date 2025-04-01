import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/gameSlice";
import secondsReducer from "./reducers/secondsSlice";

// import { checkEndMiddleware } from '../middlewares/checkEndMiddleware';
import { matchRemovalMiddleware } from '../middlewares/matchRemovalMiddleware';


export const store = configureStore({
  reducer: {
    game: gameReducer,
    time: secondsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/*checkEndMiddleware,*/matchRemovalMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;