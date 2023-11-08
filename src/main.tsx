import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import store from './store/index.ts';
import App from './App.tsx';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
