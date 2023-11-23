import React from 'react';

type MenuProfileImageProps = {
	image: string;
	username: string;
	size?: number;
	className?: string;
};

const MenuProfileImage = ({
	image,
	username,
	size = 45,
	className = ''
}: MenuProfileImageProps) => (
	<img
		src={image}
		alt={`${username} profile`}
		width={size}
		height={size}
		className={`${className} mr-5 rounded-full`}
	/>
);

export default MenuProfileImage;
