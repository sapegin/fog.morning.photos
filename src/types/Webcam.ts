interface Image {
	icon: string;
	thumbnail: string;
	preview: string;
	toenail: string;
}

interface Size {
	width: string;
	height: string;
}

interface PlayerAvailable {
	available: true;
	embed: string;
	link: string;
}
interface PlayerUnavailable {
	available: false;
	embed: '';
}

type Player = PlayerAvailable | PlayerUnavailable;

export interface Webcam {
	id: string;
	status: 'active';
	title: string;
	image: {
		current: Image;
		daylight: Image;
		update: number;
		sizes: {
			icon: Size;
			thumbnail: Size;
			preview: Size;
			toenail: Size;
		};
	};
	player: {
		live: Player;
		day: Player;
		month: Player;
		year: Player;
		lifetime: Player;
	};
	location: {
		city: string;
		region: string;
		region_code: string;
		country: string;
		country_code: string;
		continent: string;
		continent_code: string;
		latitude: number;
		longitude: number;
		timezone: string;
		wikipedia: string;
	};
}
