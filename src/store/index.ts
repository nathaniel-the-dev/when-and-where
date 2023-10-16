import { configureStore } from '@reduxjs/toolkit';
import timezoneSlice from './timezone';

const store = configureStore({
	reducer: {
		timezone: timezoneSlice.reducer,
	},
});

export type AppState = ReturnType<typeof store.getState>;

export default store;
