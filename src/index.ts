/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import dotenv from "dotenv";
import { Socket } from "socket.io";
import { createConnection } from "typeorm";

dotenv.config();
import typeORMConfig from "./typeorm.config";
import { Ship } from "./Entities/Vessel";
import MainRouter from "./routes";
import { ShipSocketData, AIS_Signal_Data } from "./utils/types";
// import passport from "passport";
// import "./utils/passport-setup";
// import session from "express-session";
// import { TypeormStore } from "connect-typeorm";
// import { Session } from "./Entities/Session";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const main = async () => {
	// Wait for Database to be Online

	// Max No. of retries for connecting to database
	let db_retries = 5;

	while (db_retries) {
		try {
			await createConnection(typeORMConfig);
			break;
		} catch (err) {
			db_retries -= 1;
			console.error(err);
			console.warn("DB Retries Left: ", db_retries);
			await new Promise((res) => setTimeout(res, 2000));
		}
	}

	const app = express();

	const corsDomains = [process.env.FRONTEND_URL!, "http://localhost:3000"];

	app.use(
		cors({
			origin: corsDomains,
			credentials: true,
		})
	);

	app.use(express.json());

	const server = require("http").Server(app);
	const io = require("socket.io")(server, {
		cors: {
			origin: process.env.FRONTEND_URL || "http://localhost:3000",
			methods: ["GET", "POST"],
			credentials: true,
		},
	});

	// const sessionMiddleware = session({
	// 	name: "qid",
	// 	store: new TypeormStore({
	// 		cleanupLimit: 2,
	// 		limitSubquery: false,
	// 		ttl: 86400,
	// 	}).connect(getRepository(Session)),
	// 	resave: false,
	// 	saveUninitialized: false,
	// 	cookie: {
	// 		maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 Years,
	// 		httpOnly: true,
	// 		secure: false, //__prod__, // if true, Cookie only works in https,
	// 		sameSite: "lax", // CSRF Protection,
	// 	},
	// 	secret:
	// 		process.env.SECRET_KEY ||
	// 		"absenfsr,jsaerbdkjcvsdf6w35wA^&IATEidavfjkvr",
	// });
	// app.use(sessionMiddleware);

	// app.use(passport.initialize());
	// app.use(passport.session());

	app.use("/", MainRouter);

	// io.use((socket: Socket, next: any) =>
	// 	sessionMiddleware(socket.request as any, {} as any, next)
	// );

	io.on("connection", (socket: Socket) => {
		console.log("User connected");
		socket.on("updated", async (data: ShipSocketData) => {
			socket.broadcast.emit("moved", {
				...data,
				lastUpdated: new Date(),
			});
			try {
				const ship = await Ship.findOne(data.email);
				if (ship) {
					ship.latitude = data.coords.latitude;
					ship.longitude = data.coords.longitude;
					ship.heading = data.coords.heading;
					ship.speed = data.coords.speed;

					await ship.save();
				} else {
					await Ship.create({
						email: data.email,
						name: data.name,
						latitude: data.coords.latitude,
						longitude: data.coords.longitude,
						heading: data.coords.heading,
						speed: data.coords.speed,
					}).save();
				}
			} catch (err) {
				console.error(err);
			}
		});

		socket.on("AIS_SIGNAL_EMIT", async (data: AIS_Signal_Data) => {
			socket.broadcast.emit("AIS_SIGNAL_RECEIVED", {
				...data,
				email: data.email,
				name: data.name,
				lastUpdated: new Date(),
			});
			try {
				const ship = await Ship.findOne(data.email);
				if (ship) {
					ship.latitude = data.location.latitude;
					ship.longitude = data.location.longitude;
					ship.heading = data.location.heading;
					ship.speed = data.location.speed;
					await ship.save();
				}
			} catch (err) {
				console.error(err);
			}
		});
	});

	server.listen(PORT, () => {
		console.log(`[⚡] Server started on http://localhost:${PORT}`);
	});
};

main().catch((err) => console.error(err));
