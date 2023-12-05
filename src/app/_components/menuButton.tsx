import { type ReactNode } from 'react';

type MenuButtonProps = {
	text: string;
	icon: ReactNode;
	onClick?: (event?: any) => void;
};

const MenuButton = ({ text, icon, onClick }: MenuButtonProps) => (
	<button
		onClick={onClick}
		className="my-2 flex w-full rounded-lg p-3 hover:bg-majorelle-blue hover:font-semibold"
	>
		<div className="mr-4 self-center">{icon}</div>
		<div className="text-base">{text}</div>
	</button>
);

export default MenuButton;
