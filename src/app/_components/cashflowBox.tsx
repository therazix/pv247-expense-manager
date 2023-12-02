import ContentBox from './contentBox';
import Pill from './pill';
import FaIcon from './faIcon';

type CashFlowBoxProps = {
	title: string;
	money: number;
	currency: string;
	iconBgColorVariant?: string;
	icon?: string;
	percentChange: number;
	isNegative: boolean;
};

const CashFlowBox = ({
	title,
	money,
	currency,
	iconBgColorVariant = 'majorelle-blue',
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
					<FaIcon icon={icon} />
				</div>
				<div>
					<p className="text-base text-cool-grey">{title}</p>
					<p className="text-2xl font-semibold text-white">
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
