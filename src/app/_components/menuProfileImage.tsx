import React from 'react';
import Image from 'next/image';

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
	<Image
		src={image}
		alt={`${username} profile`}
		width={size}
		height={size}
		className={`${className} mr-5 rounded-full`}
	/>
);

export default MenuProfileImage;
