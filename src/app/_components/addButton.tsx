import { FaPlus } from 'react-icons/fa6';

type AddButtonProps = {
	className?: string;
	onClick?: () => void;
};

const AddButton = ({ className = '', onClick }: AddButtonProps) => (
	<button
		className={`${className} m-6 rounded-full bg-majorelle-blue p-4 font-semibold hover:bg-majorelle-blue/[0.7]`}
		onClick={onClick}
	>
		<FaPlus className="h-6 w-6" />
	</button>
);

export default AddButton;
