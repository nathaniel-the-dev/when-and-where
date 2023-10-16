import Select from 'react-select';
import moment from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setTimezones } from '../store/timezone';
import { Map } from './Map';

export const Form = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		timezone: '',
		alternateTimezone: '',
	});

	const timezones = useSelector((state: any) => state.timezone.timezones).map((tz: any) => ({
		label: `(${tz.abbreviation}) ${tz.alternativeName} - ${tz.countryName}`,
		value: tz.name,
	}));

	const currentTimezone = timezones.find((tz: any) => tz.value === moment.tz.guess())?.label;

	const handleInput = (id: string) => (e: any) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[id]: e.value,
		}));
	};

	const convert = (e: any) => {
		e.preventDefault();
		dispatch(setTimezones(formData));
	};

	return (
		<div>
			<p className="mb-8 text-xl text-center">Pick a time zone to convert to!</p>

			<Map />

			<form className="max-w-3xl mx-auto" onSubmit={convert}>
				<div className="flex items-end gap-4">
					<div className="flex-1">
						<label htmlFor="timezone">Country or timezone</label>
						<Select
							id="timezone"
							placeholder={currentTimezone}
							options={timezones}
							onChange={handleInput('timezone')}
							required
						/>
					</div>
					<div className="flex-1">
						<label htmlFor="alternateTimezone">Other country or timezone</label>
						<Select
							id="alternateTimezone"
							placeholder=""
							options={timezones.filter((tz: any) => tz.value !== formData.timezone)}
							onChange={handleInput('alternateTimezone')}
							required
						/>
					</div>
				</div>
				<div className="text-center mt-6">
					<button type="submit" className="btn btn-primary">
						Convert
					</button>
				</div>
			</form>
		</div>
	);
};
