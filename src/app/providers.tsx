'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { type PropsWithChildren, useState } from 'react';

import { LastUpdateContext } from '@/store/lastUpdate';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
	const lastUpdateState = useState<string | null>(null);
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<LastUpdateContext.Provider value={lastUpdateState}>
					{children}
				</LastUpdateContext.Provider>
			</SessionProvider>
		</QueryClientProvider>
	);
};
