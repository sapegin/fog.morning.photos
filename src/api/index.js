// @ts-check
require('dotenv').config();

const path = require('path');
const fs = require('fs-extra');
const { fetchWebcams, getWebcamsImages } = require('./util/webcams');
const { getHorizontalVarianceForImages } = require('./util/fog');

const OUTPUT_FILES = [
	path.resolve(__dirname, 'public/fog.json'),
	path.resolve(__dirname, '../../static/fog.json'),
];

async function getData() {
	console.log('Fetching webcams...');
	const webcams = await fetchWebcams(process.env.FOG_LAT, process.env.FOG_LNG);

	console.log('[debug] Webcams fetched', webcams.length);

	console.log('Fetching images...');
	const images = await getWebcamsImages(webcams);

	console.log('Analyzing images...');
	const fogLevel = getHorizontalVarianceForImages(images);

	console.log('[debug] Fog level', fogLevel);

	return { webcams, fogLevel };
}

async function main() {
	const data = await getData();

	for (const file of OUTPUT_FILES) {
		fs.outputJsonSync(file, data);
	}
}

main();
