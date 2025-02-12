const WP_ADMIN_USER = {
	username: 'rakibul1@wppool.dev',
	password: 'Qp%Au*Qx4*1PTBUyjIpsjW2u',
} as const;

const {
	WP_USERNAME = WP_ADMIN_USER.username,
	WP_PASSWORD = WP_ADMIN_USER.password,
	WP_BASE_URL = 'https://staging-site-mlchga.flywp.xyz/',
} = process.env;

export { WP_ADMIN_USER, WP_USERNAME, WP_PASSWORD, WP_BASE_URL };