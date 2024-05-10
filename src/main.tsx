import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import App from './App.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from './components/Error.tsx';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary fallback={<Error />}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
