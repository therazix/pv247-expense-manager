import { type ReactNode } from 'react';

type MenuButtonProps = {
	text: string;
	icon: ReactNode;
	className: string;
	onClick?: (event?: any) => void;
	hidden: boolean;
};

const MenuButton = ({
	text,
	icon,
	className = '',
	onClick,
	hidden = false
}: MenuButtonProps) => (
	<button onClick={onClick} hidden={hidden} className={className}>
		<div className="flex">
			<div className="mr-4 self-center">{icon}</div>
			<div className="text-base">{text}</div>
		</div>
	</button>
);

export default MenuButton;
