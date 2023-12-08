import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { getAppUrl } from '@/utils';

import { Providers } from './providers';
import Menu from './_components/menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | EXPENSIO',
		default: 'EXPENSIO'
	},
	description: 'Your simple all-in-one expense manager.',
	metadataBase: new URL(getAppUrl())
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<body className={`${inter.className} block bg-dark-gunmetal lg:flex`}>
			<Providers>
				<Menu />
				<main className="h-screen grow">{children}</main>
			</Providers>
		</body>
	</html>
);

export default RootLayout;
