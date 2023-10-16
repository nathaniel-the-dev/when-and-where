import { createSlice } from '@reduxjs/toolkit';
import { rawTimeZones, type RawTimeZone } from '@vvo/tzdb';

const timezoneSlice = createSlice({
	name: 'timezone',
	initialState: {
		timezones: rawTimeZones,

		selectedTimezone: undefined as RawTimeZone | undefined,
		alternateTimezone: undefined as RawTimeZone | undefined,
	},
	reducers: {
		setTimezones(state, action) {
			state.selectedTimezone = state.timezones.find((tz) => tz.name === action.payload.timezone);
			state.alternateTimezone = state.timezones.find((tz) => tz.name === action.payload.alternateTimezone);
		},
	},
});

export const { setTimezones } = timezoneSlice.actions;

export default timezoneSlice;
