type ButtonProps = {
	text: string;
	type?: 'button' | 'submit';
	className?: string;
	onclick?: (event?: any) => void;
};

const Button = ({
	text,
	className = '',
	onclick,
	type = 'button'
}: ButtonProps) => (
	<button
		className={`${className} rounded-xl bg-majorelle-blue px-6 py-4 font-semibold hover:bg-majorelle-blue/[0.7]`}
		type={type}
		onClick={onclick}
	>
		{text}
	</button>
);

export default Button;
