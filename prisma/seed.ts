import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function main() {
	// Seed data for the User model

	// Seed data for the User model
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john.doe@example.com',
			createdAt: new Date()
		}
	});

	// Seed data for the FinancialAccount model
	const financialAccount = await prisma.financialAccount.create({
		data: {
			name: 'Savings Account',
			description: 'Personal Savings',
			balance: 5000.0,
			currency: 'USD',
			createdAt: new Date(),
			userId: user.id
		}
	});

	const financialAccount2 = await prisma.financialAccount.create({
		data: {
			name: 'Childs account',
			description: 'Account for my child',
			balance: 200.0,
			currency: 'USD',
			createdAt: new Date(),
			userId: user.id
		}
	});

	// Seed data for the Category model
	const category = await prisma.category.create({
		data: {
			name: 'Groceries',
			color: '#FF5733',
			icon: 'r',
			userId: user.id
		}
	});

	const category2 = await prisma.category.create({
		data: {
			name: 'Gifts',
			color: '#32a852',
			icon: 'x',
			userId: user.id
		}
	});

	const category3 = await prisma.category.create({
		data: {
			name: 'Clothes',
			color: '#a832a0',
			icon: 'x',
			userId: user.id
		}
	});

	// Seed data for the Account model
	const account = await prisma.account.create({
		data: {
			userId: user.id,
			type: 'Google',
			provider: 'Google',
			providerAccountId: 'google-123'
		}
	});

	// Seed data for the Session model
	const session = await prisma.session.create({
		data: {
			sessionToken: 'session-token-123',
			userId: user.id,
			expires: new Date(Date.now() + 3600000) // Expires in 1 hour
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

	const financialAccountIds = [financialAccount.id, financialAccount2.id];
	const categoryIds = [category.id, category2.id, category3.id];

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
	console.log('User: ', user.id);
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
