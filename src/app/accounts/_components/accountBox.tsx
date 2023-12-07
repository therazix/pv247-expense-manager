'use client';

import { FaPenToSquare, FaTrashCan, FaBookOpen } from 'react-icons/fa6';
import { useContext, useEffect } from 'react';
import format from 'date-fns/format';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AiOutlineBank } from 'react-icons/ai';

import ContentBox from '@/app/_components/contentBox';
import { type FinancialAccount } from '@/types/financial-account';
import useDeleteAccountMutation from '@/app/accounts/_hooks/useDeleteAccountMutation';

import { DialogRefContext, SelectedAccountContext } from '../accountProviders';

type AccountBoxProps = {
	account: FinancialAccount;
};

const AccountBox = ({ account }: AccountBoxProps) => {
	const [, setSelectedAccount] = useContext(SelectedAccountContext);
	const router = useRouter();
	const dialogRef = useContext(DialogRefContext);
	const { data: session } = useSession();

	const balanceColor = account.balance < 0 ? 'lust' : 'white';

	const formatBalance = (num: number) =>
		num.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});

	const openDetail = () => {
		router.push(`/accounts/${account.id}`);
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
			const lastUpdate = format(new Date(), 'yyyy-MM-dd_HH:mm:ss');
			router.push(`/accounts?lastUpdate=${lastUpdate}`);
		}
	}, [deleteAccountMutation, router]);

	return (
		<ContentBox>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div className="mr-6 flex h-10 w-10 self-center rounded bg-majorelle-blue p-3">
						<AiOutlineBank />
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
