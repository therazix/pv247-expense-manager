'use client';

import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { MdLogout } from 'react-icons/md';

import MenuButton from '@/app/_components/menuButton';

import MenuProfileImage from './menuProfileImage';
import MenuProfileName from './menuProfileName';

type MenuProfileProps = {
	username: string;
	image: string;
};

const MenuProfile = ({ username, image }: MenuProfileProps) => {
	const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

	const switchProfileStatus = () => {
		setIsProfileOpen(!isProfileOpen);
	};

	return (
		<>
			<button
				onClick={switchProfileStatus}
				className="flex w-full flex-row items-center justify-between"
			>
				<div className="flex items-center">
					<MenuProfileImage username={username} image={image} />
					<MenuProfileName username={username} />
				</div>
				{isProfileOpen ? <FaAngleDown /> : <FaAngleUp />}
			</button>
			<MenuButton
				className="my-2 w-full rounded-lg p-3 pl-5 hover:bg-majorelle-blue hover:font-semibold"
				onClick={signOut}
				hidden={!isProfileOpen}
				text="Sign Out"
				icon={<MdLogout />}
			/>
		</>
	);
};

export default MenuProfile;
