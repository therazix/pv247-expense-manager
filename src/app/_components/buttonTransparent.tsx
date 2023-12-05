type ButtonTransparentProps = {
	text: string;
	className?: string;
	type?: 'button' | 'submit';
	onclick?: (event: any) => void;
};

const ButtonTransparent = ({
	text,
	className = '',
	onclick,
	type = 'button'
}: ButtonTransparentProps) => (
	<button
		className={`${className} rounded-xl border-2 border-white px-6 py-4 font-semibold text-white hover:bg-majorelle-blue/[0.2]`}
		type={type}
		onClick={onclick}
	>
		{text}
	</button>
);

export default ButtonTransparent;
