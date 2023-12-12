import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { setTimezone } from '../store/timezone';
import { AppState } from '../store';
import { getTimezoneString } from '../utils';
import { useTimezones } from '../hooks/useTimezones';

export const Map = () => {
	const store = useStore<AppState>();
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const { timezones } = useTimezones();

	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const defaultZoom = 1;
	const markers = [
		new mapboxgl.Marker({
			draggable: true,
		}),
		new mapboxgl.Marker({
			draggable: true,
			color: 'red',
		}),
	] as const;
	let currentMarkerIndex = useRef(0);

	useEffect(() => {
		if (!mapContainer.current || map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			// style: 'mapbox://styles/mapbox/streets-v11',
			style: 'mapbox://styles/mapbox/streets-v12',
			zoom: defaultZoom,
		});

		map.current.on('error', () => {
			map.current = null;
			setError('Looks like something went wrong loading the map. Please refresh the page or try again later.');
		});

		// Disable map rotation using right click + drag & touch rotation gesture
		map.current.dragRotate.disable();
		map.current.touchZoomRotate.disableRotation();

		map.current.on('load', () => {
			// Navigation Controls
			map.current?.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

			// Add markers
			markers.forEach((marker) => {
				marker.setPopup(new mapboxgl.Popup());
				marker.on('dragend', onDragEnd as any);
			});
		});

		map.current.on('click', async (e) => {
			const element = (e.originalEvent.target as HTMLElement)?.closest('.mapboxgl-marker');
			if (element) return;

			showCurrentMarker(e.lngLat);
			await getTimezoneFromMap(e.lngLat);
			toggleCurrentMarkerIndex();
		});

		store.subscribe(async () => {
			const state = store.getState().timezone;

			if (state.setFromSelect) {
				const country = state[state.lastUpdated]?.countryName;
				const res = await fetch(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${
						import.meta.env.VITE_MAPBOX_API_KEY
					}&types=country`
				);
				const data = await res.json();

				const [result] = data.features;

				if (result) {
					currentMarkerIndex.current = state.lastUpdated === 'selectedTimezone' ? 0 : 1;
					const marker = markers[currentMarkerIndex.current];

					showCurrentMarker(result.geometry.coordinates);
					marker.getPopup().setText(getTimezoneString(state[state.lastUpdated]));
					if (!marker.getPopup().isOpen()) marker.togglePopup();
					toggleCurrentMarkerIndex();
				}
			}
		});
	}, []);

	async function onDragEnd(e: { type: string; target: mapboxgl.Marker }) {
		currentMarkerIndex.current = markers.indexOf(e.target);
		await getTimezoneFromMap(e.target.getLngLat());
	}

	async function getTimezoneFromMap(lngLat: { lng: number; lat: number }) {
		try {
			const response = await fetch(
				`https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${lngLat.lng},${lngLat.lat}.json?access_token=${
					import.meta.env.VITE_MAPBOX_API_KEY
				}`
			);
			const data = await response.json();

			const popup = markers[currentMarkerIndex.current].getPopup();

			const timezone = data.features[0]?.properties.TZID;

			if (timezone) {
				const selectedTimezone = timezones.find(
					(tz: any) =>
						tz.name === timezone ||
						tz.group.includes(timezone) ||
						tz.mainCities.includes(timezone.split('/')[1])
				);

				if (selectedTimezone) {
					dispatch(
						setTimezone({
							key: currentMarkerIndex.current === 0 ? 'selectedTimezone' : 'alternateTimezone',
							value: selectedTimezone.name,
							fromSelect: false,
						})
					);
					popup.setText(getTimezoneString(selectedTimezone));
				} else {
					popup.setText('Could not identify place :(');
				}
			} else {
				popup.setText('Could not identify place :(');
			}

			if (!markers[currentMarkerIndex.current].getPopup().isOpen())
				markers[currentMarkerIndex.current].togglePopup();
		} catch (error) {
			console.error(error);
		}
	}

	function toggleCurrentMarkerIndex() {
		currentMarkerIndex.current = (currentMarkerIndex.current + 1) % markers.length;
	}

	function showCurrentMarker(pos: mapboxgl.LngLatLike) {
		markers[currentMarkerIndex.current].setLngLat(pos).addTo(map.current!);
	}

	return (
		<div className="[grid-area:map]">
			{error ? (
				<div className="place-items-center grid w-full h-full">
					<p className="max-w-prose text-center">{error}</p>
				</div>
			) : (
				<div className="relative w-full h-full min-h-[20rem]">
					<div ref={mapContainer} className="w-full h-full" />
				</div>
			)}
		</div>
	);
};
