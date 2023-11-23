import { type ReactNode } from 'react';

import ContentBox from './contentBox';
import Pill from './pill';

type CashFlowBoxProps = {
	title: string;
	money: number;
	currency: string;
	percentChange: number;
	iconBgColorVariant: string;
	icon: ReactNode;
	isNegative: boolean;
};

const CashFlowBox = ({
	title,
	money,
	currency,
	iconBgColorVariant,
	icon,
	percentChange,
	isNegative
}: CashFlowBoxProps) => (
	<ContentBox>
		<div className="flex justify-between">
			<div className="flex">
				<div
					className={`bg-${iconBgColorVariant} mr-6 flex h-10 w-10 self-center rounded p-3`}
				>
					{icon}
				</div>
				<div>
					<p className="text-base text-cool-grey">{title}</p>
					<p className="text-white text-2xl font-semibold">
						{currency} {money}
					</p>
				</div>
			</div>
			<Pill
				isNegative={isNegative}
				text={`${percentChange > 0 ? '+' : ''}${percentChange.toString()}%`}
			/>
		</div>
	</ContentBox>
);

export default CashFlowBox;
