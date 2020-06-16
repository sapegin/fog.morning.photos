// @ts-check
const luminance = require('color-luminance').rec709;
const variance = require('variance');
const average = require('average');

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

function getHorizontalVarianceForImages(images) {
	return Math.round(
		average(
			images.map((image) => getHorizontalVariance(pixelsToLuminances(image)))
		)
	);
}

module.exports = {
	getHorizontalVarianceForImages,
};
