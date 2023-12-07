type ButtonTransparentProps = {
	text: string;
	className?: string;
	type?: 'button' | 'submit';
	onClick?: (event: any) => void;
};

const ButtonTransparent = ({
	text,
	className = '',
	onClick,
	type = 'button'
}: ButtonTransparentProps) => (
	<button
		className={`${className} rounded-xl border-2 border-white px-6 py-4 font-semibold text-white hover:bg-majorelle-blue/[0.2]`}
		type={type}
		onClick={onClick}
	>
		{text}
	</button>
);

export default ButtonTransparent;
