// @ts-check
const luminance = require('color-luminance').rec709;
const variance = require('variance');
const average = require('average');
const outliers = require('outliers');

function pixelsToLuminances(pixels) {
	const luminances = [];
	for (let y = 0; y < pixels.length; y++) {
		luminances[y] = [];
		for (let x = 0; x < pixels[y].length; x++) {
			const { r, g, b } = pixels[y][x];
			luminances[y][x] = luminance(r, g, b);
		}
	}
	return luminances;
}

function getHorizontalVariance(luminances) {
	const rowVariances = luminances.map(variance);
	return average(rowVariances);
}

/**
 * Average horizontal variance of luninances of given images
 */
function getHorizontalVarianceForImages(images) {
	const values = images.map((image) =>
		getHorizontalVariance(pixelsToLuminances(image))
	);

	// Sometimes images returned by the Windy API aren't complete, and give
	// very low variance value: removing them from the average calculation
	const cleanValues = values.filter(outliers());

	console.log('[debug] Variance values', values);
	console.log('[debug] Variance cleaned values', cleanValues);

	return Math.round(average(cleanValues));
}

module.exports = {
	getHorizontalVarianceForImages,
};
