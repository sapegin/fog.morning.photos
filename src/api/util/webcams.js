// @ts-check
const get = require('bent')('json');
const download = require('download');
const Jimp = require('jimp');

if (!process.env.WINDY_KEY) {
	console.error(
		'Windy API key not found, define WINDY_KEY environmental variable'
	);
	process.exit(1);
}

const EXCLUDE = (process.env.FOG_EXCLUDE || '').split(',');

/**
 * @param Record<string,any> params
 * @returns string
 */
function objectToUrlParams(params) {
	return Object.entries(params)
		.map(([key, value]) => `${key}=${value}`)
		.join('/');
}

/**
 * @param Record<string,any> params
 * @param Record<string,any> [options]
 * @returns string
 */
function getWindyUrl(params, options = {}) {
	const url = new URL(
		`https://api.windy.com/api/webcams/v2/list/${objectToUrlParams(params)}`
	);

	url.searchParams.append('key', process.env.WINDY_KEY);

	Object.entries(options).forEach(([key, value]) =>
		url.searchParams.append(key, value)
	);

	console.log('[debug] Windy URL', url.href);

	return url.href;
}

async function getImagePixels(filename) {
	const image = await Jimp.read(filename);
	const { width, height } = image.bitmap;
	const pixels = [];
	for (let y = 0; y < height; y++) {
		pixels[y] = [];
		for (let x = 0; x < width; x++) {
			pixels[y][x] = Jimp.intToRGBA(image.getPixelColor(x, y));
		}
	}
	return pixels;
}

/**
 * @param {string} url
 */
async function getImage(url) {
	try {
		const image = await download(url);
		return getImagePixels(image);
	} catch (err) {
		console.error('Cannot download image:', err.toString());
		process.exit(1);
		return undefined;
	}
}

/**
 * @param {number} lat
 * @param {number} lng
 * @param {number} [radius]
 */
async function fetchWebcams(lat, lng, radius = 5) {
	try {
		const response = await get(
			getWindyUrl(
				{ nearby: [lat, lng, radius] },
				{ show: 'webcams:image,player' }
			)
		);
		return response.result.webcams.filter(
			(webcam) => !EXCLUDE.includes(webcam.id)
		);
	} catch (err) {
		console.error('Cannot fetch webcams from Windy:', err.toString());
		process.exit(1);
		return undefined;
	}
}

function getWebcamsImages(webcams) {
	return Promise.all(
		webcams.map((webcam) => getImage(webcam.image.current.preview))
	);
}

module.exports = {
	fetchWebcams,
	getWebcamsImages,
};
