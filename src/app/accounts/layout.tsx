import React from 'react';

import AccountProviders from '@/app/accounts/accountProviders';

const AccountLayout = ({ children }: { children: React.ReactNode }) => (
	<AccountProviders>
		<div className="h-screen grow ">{children}</div>
	</AccountProviders>
);

export default AccountLayout;
