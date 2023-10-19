import { createSlice } from '@reduxjs/toolkit';
import { rawTimeZones, type RawTimeZone } from '@vvo/tzdb';

const timezoneSlice = createSlice({
	name: 'timezone',
	initialState: {
		timezones: rawTimeZones,

		selectedTimezone: undefined as RawTimeZone | undefined,
		alternateTimezone: undefined as RawTimeZone | undefined,

		setFromSelect: false,
		lastUpdated: 'selectedTimezone' as 'selectedTimezone' | 'alternateTimezone',
	},
	reducers: {
		setTimezone(
			state,
			action: { payload: { key: 'selectedTimezone' | 'alternateTimezone'; value: string; fromSelect: boolean } }
		) {
			state[action.payload.key] = state.timezones.find((tz) => tz.name === action.payload.value);
			state.setFromSelect = action.payload.fromSelect || false;
			state.lastUpdated = action.payload.key;
		},
	},
});

export const { setTimezone } = timezoneSlice.actions;

export default timezoneSlice;
