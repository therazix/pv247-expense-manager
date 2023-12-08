'use client';

import { createContext, useContext } from 'react';

type LastUpdateContextState = [string | null, (lastUpdate: string) => void];

export const LastUpdateContext = createContext<LastUpdateContextState>(
	undefined as never
);

export const useLastUpdateContext = () => useContext(LastUpdateContext);
