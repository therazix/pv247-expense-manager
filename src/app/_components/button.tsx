type ButtonProps = {
	text: string;
	type?: 'button' | 'submit';
	className?: string;
	onClick?: (event?: any) => void;
};

const Button = ({
	text,
	className = '',
	onClick,
	type = 'button'
}: ButtonProps) => (
	<button
		className={`${className} rounded-xl bg-majorelle-blue px-6 py-4 font-semibold hover:bg-majorelle-blue/[0.7]`}
		type={type}
		onClick={onClick}
	>
		{text}
	</button>
);

export default Button;
