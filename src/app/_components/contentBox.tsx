import React, { type ReactNode } from 'react';

type ContentBoxProps = {
	children?: ReactNode;
	className?: string;
};

const ContentBox = ({ children, className = '' }: ContentBoxProps) => (
	<div className={`${className} m-3 rounded-2xl bg-yankees-blue p-6 md:m-6`}>
		{children}
	</div>
);

export default ContentBox;
