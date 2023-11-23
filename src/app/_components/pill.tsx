type PillProps = {
	text: string;
	isNegative: boolean;
};

const Pill = ({ text, isNegative }: PillProps) => (
	<div
		className={`${
			!isNegative
				? 'bg-go-green/[0.15] text-go-green'
				: 'bg-lust/[0.15] text-lust'
		} self-center rounded-xl px-3 py-1	`}
	>
		{text}
	</div>
);

export default Pill;
