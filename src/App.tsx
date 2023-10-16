import { Form } from './components/Form';
import { Results } from './components/Results';

function App() {
	return (
		<main className="min-h-screen">
			<header className="flex justify-center text-center py-6 bg-blue-500 text-white">
				<h1 className="text-3xl font-bold">Timezone Converter</h1>
			</header>

			<section className="container py-12">
				<div>
					<Form />
					<Results />
				</div>
			</section>
		</main>
	);
}

export default App;
