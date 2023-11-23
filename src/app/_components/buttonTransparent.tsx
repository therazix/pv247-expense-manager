type ButtonTransparentProps = {
	className?: string;
	text: string;
};

const ButtonTransparent = ({
	text,
	className = ''
}: ButtonTransparentProps) => (
	<button
		className={`${className} rounded-xl border-2 px-6 py-4 font-semibold hover:bg-majorelle-blue/[0.2]`}
	>
		{text}
	</button>
);

export default ButtonTransparent;
