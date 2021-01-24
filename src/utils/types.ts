export type ShipSocketData = {
	email: string;
	name: string;
	lastUpdated: any;
	coords: {
		latitude: number;
		longitude: number;
		speed: number;
		heading: number;
	};
};

export type AIS_Signal_Data = {
	email: string;
	name: string;
	location: {
		latitude: number;
		longitude: number;
		heading: number;
		speed: 0;
	};
};
