import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import './Map.css';

export const Map = () => {
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);

	useEffect(() => {
		if (!mapContainer.current || map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			// style: 'mapbox://styles/mapbox/streets-v11',
			style: 'mapbox://styles/mapbox/streets-v12',
			zoom: 2,
			center: [0, 0],
		});

		map.current.on('load', () => {
			map.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');
			map.current?.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
			map.current?.addControl(new mapboxgl.GeolocateControl(), 'top-right');

			// Get current location
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					map.current?.setCenter([position.coords.longitude, position.coords.latitude]);
				});
			}
		});
	}, []);

	return (
		<div className="relative">
			<div ref={mapContainer} className="w-full h-96" />
		</div>
	);
};
