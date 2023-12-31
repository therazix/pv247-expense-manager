import Link from 'next/link';
import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { useLastUpdateContext } from '@/store/lastUpdate';

type MenuLinkProps = {
	text: string;
	href: string;
	icon: ReactNode;
};

const MenuLink = ({ text, href, icon }: MenuLinkProps) => {
	const pathname = usePathname();
	const active = pathname === href ? 'bg-majorelle-blue font-semibold' : '';
	const [lastUpdate] = useLastUpdateContext();

	return (
		<Link
			href={lastUpdate ? `${href}?lastUpdate=${lastUpdate}` : href}
			className={`${active} my-2 flex rounded-lg p-3 hover:bg-majorelle-blue hover:font-semibold`}
		>
			<div className="mr-4 self-center">{icon}</div>
			<div className="text-base">{text}</div>
		</Link>
	);
};

export default MenuLink;
