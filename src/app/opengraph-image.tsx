import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'EXPENSIO';
export const size = {
	width: 1200,
	height: 630
};

export const contentType = 'image/png';

const Image = async () => {
	const image: string = (await fetch(
		new URL('/public/logo.png', import.meta.url)
	).then(res => res.arrayBuffer())) as string;

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 64,
					background: '#1D1D41',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column'
				}}
			>
				<img width="512" height="360" src={image} alt="Logo" />
				<p
					style={{
						color: 'white',
						fontSize: 64
					}}
				>
					EXPENSIO
				</p>
				<p
					style={{
						color: 'white',
						fontSize: 32
					}}
				>
					Your simple all-in-one expense manager
				</p>
			</div>
		),
		{ ...size }
	);
};

export default Image;
