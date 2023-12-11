'use client';

import {
	FaPenToSquare,
	FaTrashCan,
	FaBookOpen,
	FaLandmark
} from 'react-icons/fa6';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ContentBox from '@/app/_components/contentBox';
import { type FinancialAccount } from '@/types/financial-account';
import useDeleteAccountMutation from '@/app/accounts/_hooks/useDeleteAccountMutation';
import { useLastUpdateContext } from '@/store/lastUpdate';
import { createTimestamp } from '@/utils';

import { DialogRefContext, SelectedAccountContext } from '../accountProviders';

type AccountBoxProps = {
	account: FinancialAccount;
};

const AccountBox = ({ account }: AccountBoxProps) => {
	const [, setSelectedAccount] = useContext(SelectedAccountContext);
	const [, setLastUpdate] = useLastUpdateContext();
	const dialogRef = useContext(DialogRefContext);

	const router = useRouter();
	const { data: session } = useSession();

	const balanceColor = account.balance < 0 ? 'lust' : 'white';

	const formatBalance = (num: number) =>
		num.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});

	const openDetail = () => {
		router.push(`/transactions?financialAccountId=${account.id}`);
	};

	const openDialog = () => {
		if (dialogRef.current !== null) {
			setSelectedAccount(account);
			dialogRef.current.showModal();
		}
	};

	const deleteAccountMutation = useDeleteAccountMutation(session);

	useEffect(() => {
		if (deleteAccountMutation.isSuccess) {
			const lastUpdate = createTimestamp();
			setLastUpdate(lastUpdate);
			router.push(`/accounts?lastUpdate=${lastUpdate}`);
		}
	}, [deleteAccountMutation, router, setLastUpdate]);

	return (
		<ContentBox>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div className="mr-6 flex h-10 w-10 self-center rounded bg-majorelle-blue p-3">
						<FaLandmark />
					</div>
					<div>
						<p className={`text-${balanceColor} mr-6 text-base font-semibold`}>
							{account.currency} {formatBalance(account.balance)}
						</p>
					</div>
					<div>
						<p className="text-base text-cool-grey">{account.name}</p>
					</div>
				</div>
				<div className="flex flex-row gap-3">
					<button onClick={openDetail} title="Detail">
						<FaBookOpen />
					</button>
					<button onClick={openDialog} title="Edit">
						<FaPenToSquare />
					</button>
					<button
						onClick={() => deleteAccountMutation.mutate(account)}
						title="Delete"
					>
						<FaTrashCan />
					</button>
				</div>
			</div>
		</ContentBox>
	);
};

export default AccountBox;
