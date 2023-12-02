'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import Image from 'next/image';

import MenuLink from './menuLink';
import MenuProfile from './menuProfile';

const Menu = () => {
	const [isMenuHidden, setIsMenuHidden] = useState(true);

	const toggleMenu = () => {
		setIsMenuHidden(current => !current);
	};

	return (
		<nav className="w-full rounded-b-2xl bg-yankees-blue p-6 lg:h-screen lg:w-72 lg:rounded-r-2xl">
			<div className="flex justify-between">
				<div className="lg:mb-10">
					<Image
						src="/logo.png"
						alt="logo"
						width={70}
						height={70}
						className="mr-2 inline"
					/>
					<h1 className="inline text-2xl">EXPENSIO</h1>
				</div>
				<button onClick={toggleMenu} className="block lg:hidden">
					<FaBars className="self-center text-3xl font-bold" />
				</button>
			</div>
			<div className="lg:block" hidden={isMenuHidden}>
				<div className="flex-col lg:flex">
					<MenuLink
						href="/dashboard"
						text="Dashboard"
						icon={<FaBars className="text-lg" />}
					/>
					<MenuLink
						href="/accounts"
						text="Accounts"
						icon={<FaBars className="text-lg" />}
					/>
					<MenuLink
						href="/categories"
						text="Categories"
						icon={<FaBars className="text-lg" />}
					/>
					<hr className="my-5 text-majorelle-blue/[0.5]" />
					<MenuLink
						href="/settings"
						text="Settings"
						icon={<FaBars className="text-lg" />}
					/>
				</div>
				{/* TODO: MenuProfile should be down */}
				<MenuProfile username="username" image="https://placehold.co/100x100" />
			</div>
		</nav>
	);
};

export default Menu;
