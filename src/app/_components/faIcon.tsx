import {
	FaArrowTrendDown,
	FaArrowTrendUp,
	FaBasketball,
	FaBowlRice,
	FaCar,
	FaExclamation,
	FaHouse,
	FaShirt
} from 'react-icons/fa6';

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
		case 'FaCar':
			return <FaCar className={className} />;
		case 'FaShirt':
			return <FaShirt className={className} />;
		case 'FaBowlRice':
			return <FaBowlRice className={className} />;
		case 'FaArrowTrendUp':
			return <FaArrowTrendUp className={className} />;
		case 'FaArrowTrendDown':
			return <FaArrowTrendDown className={className} />;

		default:
			return <FaExclamation />;
	}
};

export default FaIcon;
