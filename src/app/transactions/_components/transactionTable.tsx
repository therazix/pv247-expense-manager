'use client';

import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { type Transaction } from '@/types/transaction';
import { useLastUpdateContext } from '@/store/lastUpdate';
import { financialAccountSchema } from '@/validators/financial-account';
import { categorySchema } from '@/validators/category';

import {
	DialogRefContext,
	SelectedTransactionContext
} from '../transactionProviders';
import useDeleteTransactionMutation from '../_hooks/useDeleteTransactionMutation';
import useDeleteSelectedTransactionMutation from '../_hooks/useDeleteSelectedTransactionMutation';

type TransactionTableProps = {
	transactions: Transaction[];
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
	const [, setSelectedTransaction] = useContext(SelectedTransactionContext);
	const [, setLastUpdate] = useLastUpdateContext();
	const dialogRef = useContext(DialogRefContext);
	const searchParams = useSearchParams();
	const router = useRouter();

	const financialAccountId = searchParams.get('financialAccountId');
	const categoryId = searchParams.get('categoryId');

	const deleteTransactionMutation = useDeleteTransactionMutation(
		router,
		setLastUpdate
	);

	const deleteSelectedTransactionsMutation =
		useDeleteSelectedTransactionMutation(router, setLastUpdate);

	const openDialog = (transactionId: string) => {
		if (dialogRef.current !== null) {
			const selectedTransaction = transactions.find(
				transaction => transaction.id === transactionId
			);

			setSelectedTransaction(selectedTransaction ?? null);
			dialogRef.current.showModal();
		}
	};

	const useFinancialAccountQuery = (financialAccountId: string) =>
		useQuery({
			queryKey: ['getFinancialAccount'],
			queryFn: async () => {
				const response = await fetch(
					`/api/financialAccount/${financialAccountId}`
				).then(res => res.json());

				//TODO: error handling
				const financialAccount = financialAccountSchema.parse(response);
				return financialAccount;
			}
		});

	const financialAccount = useFinancialAccountQuery(
		financialAccountId as string
	);

	const useCategoryQuery = (categoryId: string) =>
		useQuery({
			queryKey: ['getCategory'],
			queryFn: async () => {
				const response = await fetch(`/api/category/${categoryId}`).then(res =>
					res.json()
				);

				//TODO: error handling
				const category = categorySchema.parse(response);
				return category;
			}
		});

	const category = useCategoryQuery(categoryId as string);

	const data = [...transactions];

	const columns = [
		{
			name: 'dateString',
			label: 'Date',
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: 'amount',
			label: 'Amount',
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: 'financialAccountName',
			label: 'Account',
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: 'categoryName',
			label: 'Category',
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: 'name',
			label: 'Name',
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: 'description',
			label: 'Description',
			options: {
				filter: true,
				sort: true
			}
		},
		{
			name: '',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: number) => (
					<div className="flex flex-row flex-wrap gap-3">
						<button
							className="rounded-md bg-majorelle-blue px-3 py-1 text-white hover:bg-yankees-blue"
							onClick={() => {
								openDialog(data[dataIndex].id);
							}}
						>
							Edit
						</button>
						<button
							className="rounded-md bg-rose-red px-3 py-1 text-white hover:bg-chocolate-cosmos"
							onClick={() => {
								deleteTransactionMutation.mutate(data[dataIndex].id);
							}}
						>
							Delete
						</button>
					</div>
				)
			}
		}
	];

	const options = {
		download: false,
		tableId: 'transactionTable',
		responsive: 'vertical',
		customToolbarSelect: (selectedRows: { data: Array<any> }) => (
			<button
				className="mx-3 rounded-md bg-rose-red px-3 py-1 text-white hover:bg-chocolate-cosmos"
				onClick={() => {
					const selectedIds = selectedRows.data.map(r => data[r.dataIndex].id);
					deleteSelectedTransactionsMutation.mutate(selectedIds);
				}}
			>
				Delete selected
			</button>
		)
	};

	const title =
		categoryId && financialAccountId
			? `Category: ${category.data?.name}, Account: ${financialAccount.data?.name}`
			: categoryId
			? `Category: ${category.data?.name}`
			: financialAccountId
			? `Account: ${financialAccount.data?.name}`
			: 'All transactions';

	return (
		<MUIDataTable
			title={title}
			data={data}
			options={options}
			columns={columns}
		/>
	);
};

export default TransactionTable;
