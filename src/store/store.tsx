import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/gameSlice";
import secondsReducer from "./reducers/secondsSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    time: secondsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;