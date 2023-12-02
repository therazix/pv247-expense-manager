import { FaBasketball, FaExclamation, FaHouse } from 'react-icons/fa6';

type FaIconProps = {
	icon?: string;
	className?: string;
};

const FaIcon = ({ icon, className = '' }: FaIconProps) => {
	switch (icon) {
		case 'FaHouse':
			return <FaHouse className={className} />;
		case 'FaBasketball':
			return <FaBasketball className={className} />;

		default:
			return <FaExclamation />;
	}
};

export default FaIcon;
