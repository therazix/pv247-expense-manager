'use client';

import {
	type FC,
	type ReactNode,
	createContext,
	useState,
	useContext
} from 'react';

type FinancialAccountInfoType = {
	name: string;
	id: string;
};

type FinancialState = [
	FinancialAccountInfoType,
	React.Dispatch<React.SetStateAction<FinancialAccountInfoType>>
];

export const FinancialAccountContext = createContext<FinancialState>(
	undefined as never
);

const DashboardWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	// TODO (Vojta) : Add logic for fetching financial accounts from API based on user ID

	const financialAccountState = useState<FinancialAccountInfoType>({
		name: 'Default',
		id: 'Default'
	});

	return (
		<FinancialAccountContext.Provider value={financialAccountState}>
			{children}
		</FinancialAccountContext.Provider>
	);
};

export const useFinancialAccountSelect = () =>
	useContext(FinancialAccountContext);

export default DashboardWrapper;
