import { PrismaClient } from '@prisma/client';
import { fi } from 'date-fns/locale';
const prisma = new PrismaClient();
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function main() {
	// Seed data for the User model

	const xmanthId = '901373a2-351b-46d9-b30a-da4c9e8a7595';

	// Seed data for the FinancialAccount model
	const financialAccount = await prisma.financialAccount.create({
		data: {
			name: 'Savings Account',
			description: 'Personal Savings',
			balance: 1000000.0,
			currency: 'CZK',
			createdAt: new Date(),
			userId: xmanthId
		}
	});

	const financialAccount2 = await prisma.financialAccount.create({
		data: {
			name: 'Childs account',
			description: 'Account for my child',
			balance: 200.0,
			currency: 'CZK',
			createdAt: new Date(),
			userId: xmanthId
		}
	});

	const financialAccount3 = await prisma.financialAccount.create({
		data: {
			name: 'Credit Card',
			description: 'Credit Card',
			balance: 80000.0,
			currency: 'CZK',
			createdAt: new Date(),
			userId: xmanthId
		}
	});

	// Seed data for the Transaction model
	/*const transaction = await prisma.transaction.create({
		data: {
			name: 'Grocery Shopping',
			amount: 50.0,
			datetime: new Date(),
			financialAccountId: financialAccount.id,
			categoryId: category.id,
			description: 'Grocery Shopping'
		}
	});*/

	// Auto generate 50 transactions -----------------------

	const financialAccountIds = [
		financialAccount.id,
		financialAccount2.id,
		financialAccount3.id
	];
	const categoryIds = [
		'd49a2eaa-433f-41dc-894f-78eeb1d92ae3',
		'67083d72-e92f-4304-8a37-b67d45a7fc7d',
		'8216b167-0aed-4e7f-b520-a3d5115ed616'
	];

	const startDate = new Date('2023-01-01');
	const endDate = new Date('2023-12-31');

	for (let i = 0; i < 500; i++) {
		const randomFinancialAccountId =
			financialAccountIds[
				Math.floor(Math.random() * financialAccountIds.length)
			];
		const randomCategoryId =
			categoryIds[Math.floor(Math.random() * categoryIds.length)];

		let randomAmount = Math.random() * 100; // Adjust as needed
		const isNegative = Math.random() < 0.5; // Adjust as needed
		if (isNegative) {
			randomAmount *= -1;
		}
		// Generate a random date within the specified range
		const randomDate = new Date(
			startDate.getTime() +
				Math.random() * (endDate.getTime() - startDate.getTime())
		);

		const transactionx = await prisma.transaction.create({
			data: {
				name: `Transaction ${i + 1}`,
				amount: randomAmount,
				datetime: randomDate,
				financialAccountId: randomFinancialAccountId,
				categoryId: randomCategoryId
			}
		});
	}
	// End of auto generate 50 transactions -----------------------

	// You can continue adding more seed data for other models if needed

	console.log('Seed data created successfully!');
	console.log('Childs Account: ', financialAccount2.id);
	console.log('Savings Account: ', financialAccount.id);
	console.log('User: ', xmanthId);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
