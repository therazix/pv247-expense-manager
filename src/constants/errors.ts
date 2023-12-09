export const authErrors = {
	OAuthSignin: 'Error occurred while constructing an authorization URL.',
	OAuthCallback: 'Error in handling the response from the OAuth provider.',
	OAuthCreateAccount:
		'Failed to create a user in the database for the OAuth provider.',
	EmailCreateAccount:
		'Failed to create a user in the database for the email provider.',
	Callback: 'Error occurred in the OAuth callback handler route.',
	OAuthAccountNotLinked:
		'The email on the account is already linked, but not with this OAuth account. Sign in with your original account.',
	EmailSignin: 'Failed to send the email with the verification token.',
	CredentialsSignin: 'The provided credentials are incorrect.',
	SessionRequired:
		'You need to be signed in to access the content of this page.',
	Default: 'An unexpected error occurred.'
};
