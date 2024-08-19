module.exports = {
	apps: [
		{
			name: 'the-wild-oasis-website',
			script: 'npm',
			args: 'run dev',
			env: {
				NODE_ENV: 'development',
				ENV_VAR1: 'environment-variable',
			},
		},
	],
};
