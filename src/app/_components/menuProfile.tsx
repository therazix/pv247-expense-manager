import { FaAngleDown } from 'react-icons/fa6';
import React from 'react';

import MenuProfileImage from './menuProfileImage';
import MenuProfileName from './menuProfileName';

type MenuProfileProps = {
	username: string;
	image: string;
};

const MenuProfile = ({ username, image }: MenuProfileProps) => (
	<div className="hidden items-center justify-between lg:flex">
		<div className="flex items-center">
			<MenuProfileImage username={username} image={image} />
			<MenuProfileName username={username} />
		</div>
		<FaAngleDown />
	</div>
);

export default MenuProfile;
