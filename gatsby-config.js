require('dotenv').config();

module.exports = {
	siteMetadata: {
		title: 'Is it foggy in Berlin?',
		description: 'Berlin fog radar.',
		lang: 'en',
		url: 'https://fog.morning.photos',
		twitter: '@iamsapegin',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-typescript',
		'gatsby-plugin-netlify',
	],
};
