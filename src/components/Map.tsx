import mapboxgl from 'mapbox-gl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { setTimezone } from '../store/timezone';
import { AppState } from '../store';
import { getTimezoneString } from '../utils';
import { useTimezones } from '../hooks/useTimezones';

function getFallbackTimezone(lng: number) {
	return `Etc/GMT+${-Math.ceil((lng / 7.5 - 1) / 2)}`.replace('+-', '-');
}

export const Map = () => {
	const store = useStore<AppState>();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [announcement, setAnnouncement] = useState('');
	const dispatch = useDispatch();

	const { timezones } = useTimezones();

	const mapContainer = useRef<HTMLDivElement | null>(null);
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
	const currentMarkerIndex = useRef(0);
	const storeUnsubscribe = useRef<(() => void) | null>(null);

	const toggleCurrentMarkerIndex = useCallback(() => {
		currentMarkerIndex.current = (currentMarkerIndex.current + 1) % markers.length;
	}, []);

	const showCurrentMarker = useCallback((pos: mapboxgl.LngLatLike) => {
		markers[currentMarkerIndex.current].setLngLat(pos).addTo(map.current!);
	}, []);

	const getTimezoneFromMap = useCallback(async (lngLat: { lng: number; lat: number }) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${lngLat.lng},${lngLat.lat}.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`
			);
			const data = await response.json();

			const popup = markers[currentMarkerIndex.current].getPopup();
			let timezone = data.features[0]?.properties.TZID;

			if (!timezone) {
				timezone = getFallbackTimezone(lngLat.lng);
			}

			const selectedTimezone = timezones.find(
				(tz) => tz.name === timezone || tz.group.includes(timezone) || tz.mainCities.includes(timezone.split('/')[1])
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
				setAnnouncement(`Timezone set to ${selectedTimezone.alternativeName}`);
			} else {
				popup.setText('Could not identify place :(');
				setAnnouncement('Could not identify timezone for this location');
			}

			if (!markers[currentMarkerIndex.current].getPopup().isOpen()) {
				markers[currentMarkerIndex.current].togglePopup();
			}
		} catch (err) {
			console.error(err);
			setAnnouncement('Failed to look up timezone');
		} finally {
			setIsLoading(false);
		}
	}, [dispatch, timezones]);

	const onDragEnd = useCallback((e?: object) => {
		const marker = e && 'target' in e ? markers.find((m) => m === (e as { target: mapboxgl.Marker }).target) : undefined;
		if (!marker) return;
		currentMarkerIndex.current = markers.indexOf(marker);
		getTimezoneFromMap(marker.getLngLat());
	}, [getTimezoneFromMap]);

	useEffect(() => {
		if (!mapContainer.current || map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			zoom: defaultZoom,
		});

		map.current.on('error', () => {
			map.current = null;
			setError('Looks like something went wrong loading the map. Please refresh the page or try again later.');
		});

		map.current.dragRotate.disable();
		map.current.touchZoomRotate.disableRotation();

		map.current.on('load', () => {
			map.current?.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

			markers.forEach((marker) => {
				marker.setPopup(new mapboxgl.Popup());
				marker.on('dragend', onDragEnd);
			});
		});

		map.current.on('click', async (e) => {
			const element = (e.originalEvent.target as HTMLElement)?.closest('.mapboxgl-marker');
			if (element) return;

			showCurrentMarker(e.lngLat);
			await getTimezoneFromMap(e.lngLat);
			toggleCurrentMarkerIndex();
		});

		map.current.getCanvas().addEventListener('keydown', (e: KeyboardEvent) => {
			if (!map.current) return;

			if (e.key === 'Enter') {
				const center = map.current.getCenter();
				showCurrentMarker(center);
				getTimezoneFromMap(center);
				toggleCurrentMarkerIndex();
			}
		});

		const unsub = store.subscribe(async () => {
			const state = store.getState().timezone;

			if (state.setFromSelect) {
				const country = state[state.lastUpdated]?.countryName;
				const res = await fetch(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}&types=country`
				);
				const data = await res.json();

				const [result] = data.features;

				if (result) {
					currentMarkerIndex.current = state.lastUpdated === 'selectedTimezone' ? 0 : 1;
					const marker = markers[currentMarkerIndex.current];
					const tz = state[state.lastUpdated];
					if (!tz) return;
					showCurrentMarker(result.geometry.coordinates);
					marker.getPopup().setText(getTimezoneString(tz));
					if (!marker.getPopup().isOpen()) marker.togglePopup();
					toggleCurrentMarkerIndex();
				}
			}
		});

		storeUnsubscribe.current = unsub;

		return () => {
			unsub();
			map.current?.remove();
			map.current = null;
		};
	}, [getTimezoneFromMap, onDragEnd, showCurrentMarker, store, toggleCurrentMarkerIndex]);

	return (
		<div className="[grid-area:map]" role="application" aria-label="Interactive world map with timezone markers">
			{error ? (
				<div className="grid w-full h-full place-items-center bg-slate-900/80" role="alert">
					<div className="max-w-xs p-6 text-center">
						<div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-red-500/10">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-400" aria-hidden="true">
								<path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
							</svg>
						</div>
						<p className="text-sm leading-relaxed text-slate-400">{error}</p>
					</div>
				</div>
			) : (
				<div className="relative w-full h-full min-h-[16rem] sm:min-h-[20rem]">
					{isLoading && (
						<div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white/90 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg animate-fade-in" role="status" aria-label="Loading timezone data">
							<span className="inline-block w-2 h-2 bg-indigo-400 rounded-full animate-pulse-soft" />
							Looking up timezone...
						</div>
					)}
					<div
						ref={mapContainer}
						className="w-full h-full"
						tabIndex={0}
						aria-label="Map. Press Enter to place a marker at the center."
						role="img"
					/>
					<div aria-live="polite" aria-atomic="true" className="sr-only">
						{announcement}
					</div>
				</div>
			)}
		</div>
	);
};
