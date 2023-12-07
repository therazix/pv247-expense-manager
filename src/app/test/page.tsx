'use client';

import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

import CashFlowBox from '../_components/cashflowBox';
import ContentBox from '../_components/contentBox';
import ButtonTransparent from '../_components/buttonTransparent';
import Button from '../_components/button';

const ComponentPage = () => (
	<div>
		<ContentBox>
			<p>TEST</p>
		</ContentBox>
		<CashFlowBox
			title="Total Income"
			money={100}
			currency="USD"
			percentChange={0.5}
			iconBgColorVariant="maya-blue"
			isNegative={false}
		/>
		<CashFlowBox
			title="Total Outcome"
			money={12.52}
			currency="USD"
			percentChange={-1.42}
			iconBgColorVariant="maya-blue"
			isNegative
		/>
		<div className="-mt-6 flex flex-wrap">
			<ContentBox>
				<ButtonTransparent text="Transparent Button 1" />
			</ContentBox>
			<ContentBox>
				<Button text="Button 1" />
			</ContentBox>
		</div>

		<ButtonTransparent text="Transparent Button 2" className="ml-6" />
		<Button text="Button 2" className="ml-6" />
	</div>
);

export default ComponentPage;
