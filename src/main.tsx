import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import App from './App.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from './components/Error.tsx';

const mapboxKey = import.meta.env.VITE_MAPBOX_API_KEY;

if (!mapboxKey) {
	document.getElementById('root')!.innerHTML =
		'<p style="color:white;padding:2rem;text-align:center;">Mapbox API key is missing. Set <code>VITE_MAPBOX_API_KEY</code> in your <code>.env</code> file.</p>';
	throw new globalThis.Error('Missing VITE_MAPBOX_API_KEY environment variable');
}

mapboxgl.accessToken = mapboxKey;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary fallback={<Error />}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
