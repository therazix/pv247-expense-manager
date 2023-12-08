'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { MdLogin } from 'react-icons/md';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import MenuLink from './menuLink';
import MenuProfile from './menuProfile';

const Menu = () => {
	const { data, status } = useSession();
	const [isMenuHidden, setIsMenuHidden] = useState(true);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsMenuHidden(current => !current);
	};

	useEffect(() => {
		// Close mobile menu when changing page
		setIsMenuHidden(true);
	}, [pathname]);

	return (
		<nav className="w-full rounded-b-2xl bg-yankees-blue p-6 lg:h-screen lg:w-[260px] lg:rounded-r-2xl">
			<div className="flex justify-between">
				<div className="flex items-center lg:mb-10">
					<Image
						src="/logo.png"
						alt="logo"
						width={70}
						height={70}
						className="mr-2 inline"
					/>
					<h1 className="inline text-2xl font-semibold">EXPENSIO</h1>
				</div>
				<button onClick={toggleMenu} className="block lg:hidden">
					<FaBars className="self-center text-3xl font-bold" />
				</button>
			</div>
			<div className="flex-col lg:flex" hidden={isMenuHidden}>
				<MenuLink
					href="/"
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
				{status === 'authenticated' && data ? (
					<MenuProfile
						username={data.user.name ? data.user.name : 'User'}
						image={
							data.user.image ? data.user.image : 'https://placehold.co/100x100'
						}
					/>
				) : (
					<MenuLink
						href="/sign-in"
						text="Sign In"
						icon={<MdLogin className="text-lg" />}
					/>
				)}
			</div>
		</nav>
	);
};

export default Menu;
