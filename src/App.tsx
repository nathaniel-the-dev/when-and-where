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
		<Provider store={store}>
			<div className="app-layout bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
				<Header />
				<Main>
					<Form />
					<Results />
				</Main>
				<Footer />
				<Map />
			</div>
		</Provider>
	);
}

export default App;
