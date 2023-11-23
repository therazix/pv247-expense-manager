type ButtonProps = {
	className?: string;
	text: string;
};

const Button = ({ text, className = '' }: ButtonProps) => (
	<button
		className={`${className} rounded-xl bg-majorelle-blue px-6 py-4 font-semibold hover:bg-majorelle-blue/[0.7]`}
	>
		{text}
	</button>
);

export default Button;
