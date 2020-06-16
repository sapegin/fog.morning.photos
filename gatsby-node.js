// @ts-check
const path = require('path');
const { fetchWebcams, getWebcamsImages } = require('./src/util/webcams');
const { getHorizontalVarianceForImages } = require('./src/util/fog');

exports.onCreateWebpackConfig = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
};

exports.createPages = async ({ actions: { createPage } }) => {
	const webcams = await fetchWebcams(process.env.FOG_LAT, process.env.FOG_LNG);

	console.log('🍕', webcams);

	const images = await getWebcamsImages(webcams);

	console.log('🦀', images);

	const fogLevel = getHorizontalVarianceForImages(images);

	console.log('🐡', fogLevel);

	createPage({
		path: '/',
		component: path.resolve(`${__dirname}/src/layouts/Index.tsx`),
		context: { webcams, fogLevel },
	});
};
