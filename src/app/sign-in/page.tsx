'use client';

import { signIn, useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import AuthError from '@/app/sign-in/errors';
import Spinner from '@/app/_components/spinner';

const SignInPage = () => {
	const searchParams = useSearchParams();
	const [errorMessage, setErrorMessage] = useState<string>('');

	const { status } = useSession();

	const error = searchParams.get('error');

	useState(() => {
		if (error && Object.keys(AuthError).includes(error)) {
			Object.entries(AuthError)
				.find(([key, _]) => key === error)
				?.map(message => setErrorMessage(message));
		}
	});

	if (status === 'loading') {
		return <Spinner />;
	}

	if (status === 'authenticated') {
		redirect('/');
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="mb-6 mt-7 text-3xl font-bold">Sign In</h1>
			<span className="my-3 text-lust">{errorMessage}</span>
			<div className="mx-auto mb-20 flex w-fit flex-col space-y-4 rounded-xl bg-[#0d1117] p-5">
				<button
					onClick={() => signIn('discord')}
					className="flex w-fit rounded-xl bg-[#5865F2] px-5 py-5 text-white hover:bg-[rgba(88,101,242,0.8)]"
				>
					<img
						className="mr-7"
						loading="lazy"
						height="24"
						width="24"
						src="https://authjs.dev/img/providers/discord.svg"
						alt="Discord logo"
					/>
					<span className="pr-7 font-semibold">Sign in with Discord</span>
				</button>
				<button
					onClick={() => signIn('github')}
					className="flex w-fit rounded-xl bg-[#24292f] px-5 py-5 text-white hover:bg-[rgba(36,41,47,0.8)]"
				>
					<img
						className="mr-7"
						loading="lazy"
						height="24"
						width="24"
						src="https://authjs.dev/img/providers/github.svg"
						alt="GitHub logo"
					/>
					<span className="pr-7 font-semibold">Sign in with GitHub</span>
				</button>
				<button
					onClick={() => signIn('google')}
					className="flex w-fit rounded-xl bg-white px-5 py-5 text-[#000] hover:bg-[rgba(255,255,255,0.8)]"
				>
					<img
						className="mr-7"
						loading="lazy"
						height="24"
						width="24"
						src="https://authjs.dev/img/providers/google.svg"
						alt="Google logo"
					/>
					<span className="pr-7 font-semibold">Sign in with Google</span>
				</button>
			</div>
		</div>
	);
};

export default SignInPage;
