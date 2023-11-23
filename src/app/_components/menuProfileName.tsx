import React from 'react';

type MenuProfileNameProps = {
	username: string;
};

const MenuProfileName = ({ username }: MenuProfileNameProps) => (
	<p className="text-lg font-semibold">{username}</p>
);

export default MenuProfileName;
