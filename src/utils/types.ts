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
