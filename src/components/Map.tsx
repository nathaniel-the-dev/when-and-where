import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { setTimezone } from '../store/timezone';
import { AppState } from '../store';
import { getTimezoneString } from '../hooks/utils';

export const Map = () => {
	const store = useStore<AppState>();
	const dispatch = useDispatch();

	const timezones = store.getState().timezone.timezones;

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
	let currentMarkerIndex = 0;

	async function onDragEnd(e: { type: string; target: mapboxgl.Marker }) {
		await getTimezoneFromMap(e.target.getLngLat());
		currentMarkerIndex = markers.indexOf(e.target);
	}

	async function getTimezoneFromMap(lngLat: { lng: number; lat: number }) {
		try {
			const response = await fetch(
				`https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${lngLat.lng},${lngLat.lat}.json?access_token=${
					import.meta.env.VITE_MAPBOX_API_KEY
				}`
			);
			const data = await response.json();

			const popup = markers[currentMarkerIndex].getPopup();

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
							key: currentMarkerIndex === 0 ? 'selectedTimezone' : 'alternateTimezone',
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

			if (!markers[currentMarkerIndex].getPopup().isOpen()) markers[currentMarkerIndex].togglePopup();
		} catch (error) {
			console.error(error);
		}
	}

	function toggleCurrentMarkerIndex() {
		currentMarkerIndex = (currentMarkerIndex + 1) % markers.length;
	}

	function showCurrentMarker(pos: mapboxgl.LngLatLike) {
		markers[currentMarkerIndex].setLngLat(pos).addTo(map.current!);
	}

	useEffect(() => {
		if (!mapContainer.current || map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			style: 'mapbox://styles/mapbox/streets-v11',
			// style: 'mapbox://styles/mapbox/streets-v12',
			zoom: defaultZoom,
		});

		// Disable map rotation using right click + drag & touch rotation gesture
		map.current.dragRotate.disable();
		map.current.touchZoomRotate.disableRotation();

		map.current.on('load', () => {
			// Navigation Controls
			map.current?.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

			// Geolocation Controls
			const geolocate = new mapboxgl.GeolocateControl();
			map.current?.addControl(geolocate, 'bottom-left');
			geolocate.on('geolocate', () => {
				map.current?.setZoom(defaultZoom);
			});

			// Add markers
			markers.forEach((marker) => {
				marker.setPopup(new mapboxgl.Popup());
				marker.on('dragend', onDragEnd as any);
				marker.on('click', (e) => {
					if (!marker.getPopup().isOpen()) marker.togglePopup();
					console.log(e);
				});
			});
		});

		map.current.on('click', async (e) => {
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
					currentMarkerIndex = state.lastUpdated === 'selectedTimezone' ? 0 : 1;
					const marker = markers[currentMarkerIndex];

					showCurrentMarker(result.geometry.coordinates);
					marker.getPopup().setText(getTimezoneString(state[state.lastUpdated]));
					if (!marker.getPopup().isOpen()) marker.togglePopup();
					toggleCurrentMarkerIndex();
				}
			}
		});
	}, []);

	return (
		<div className="relative overflow-hidden rounded-lg">
			<div ref={mapContainer} className="h-[25rem] w-full" />
		</div>
	);
};
