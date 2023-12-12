import { createSlice } from '@reduxjs/toolkit';
import { rawTimeZones, type RawTimeZone } from '@vvo/tzdb';
import { formatTZValue } from '../utils';
import { AppState } from '.';

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

export const getTimezones = (state: AppState) => state.timezone.timezones;
export const getSelectedTimezone = (state: AppState) => state.timezone.selectedTimezone;

export const getTimezoneFormatted = (key: 'selectedTimezone' | 'alternateTimezone') => (state: AppState) =>
	state.timezone[key] && formatTZValue(state.timezone[key]);

export default timezoneSlice;
