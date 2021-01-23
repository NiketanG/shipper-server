import { IncomingMessage } from "http";
import { Ship } from "../Entities/Vessel";

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
	location: {
		latitude: number;
		longitude: number;
		heading: number;
		speed: 0;
	};
};

export type ExtendedRequest = IncomingMessage & {
	session?: {
		passport?: {
			user?: Ship;
		};
	};
};
