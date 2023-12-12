import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { Form } from './components/Form';
import { Results } from './components/Results';
import { Map } from './components/Map';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<>
			<Provider store={store}>
				<main className="app-layout text-white bg-gray-700">
					<Header />
					<Main>
						<Form />
						<Results />
					</Main>
					<Footer />

					<Map />
				</main>
			</Provider>
		</>
	);
}

export default App;
