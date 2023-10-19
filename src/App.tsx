import { Form } from './components/Form';
import { Results } from './components/Results';

function App() {
	return (
		<main className="min-h-screen grid">
			<header className="flex justify-center text-center py-6 bg-blue-500 text-white">
				<h1 className="text-3xl font-bold">Timezone Converter</h1>
			</header>

			<section className="container py-12">
				<div>
					<Form />
					<Results />
				</div>
			</section>

			<footer className="flex justify-center text-center py-2 mt-auto">
				<p className="text-sm text-gray-400">
					Made with ❤️ by{' '}
					<a href="https://github.com/Nathan1434" target="_blank" className="hover:underline">
						Nathaniel Campbell
					</a>
				</p>
			</footer>
		</main>
	);
}

export default App;
