import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign In'
};

const SignInLayout = ({ children }: { children: React.ReactNode }) => children;

export default SignInLayout;
