import ExpensesLine from './charts/expenses-line';

const Home = () => (
	<main className="flex min-h-screen flex-col items-center justify-between p-24">
		<div>
			<ExpensesLine />
		</div>
	</main>
);

export default Home;
