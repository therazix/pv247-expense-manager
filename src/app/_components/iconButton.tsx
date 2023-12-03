import FaIcon from './faIcon';

type IconButtonProps = {
	icon?: string;
	iconSelectableColor?: string;
	selectableColor?: string;
	type?: 'button' | 'submit';
	className?: string;
	onclick?: () => void;
};

const IconButton = ({
	icon,
	iconSelectableColor = 'white',
	className = '',
	selectableColor = 'majorelle-blue',
	onclick,
	type = 'button'
}: IconButtonProps) => (
	<button
		className={`${className} rounded-full bg-${selectableColor} p-2 font-semibold hover:bg-${selectableColor}/[0.7] text-${iconSelectableColor}`}
		type={type}
		onClick={onclick}
	>
		<FaIcon icon={icon} />
	</button>
);

export default IconButton;
