/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import dotenv from "dotenv";
import { Socket } from "socket.io";
import { createConnection } from "typeorm";

dotenv.config();
import typeORMConfig from "./typeorm.config";
import { Ship } from "./Entities/Vessel";
import MainRouter from "./routes";

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
	const server = require("http").Server(app);
	const io = require("socket.io")(server);

	app.use("/", MainRouter);
	io.on("connection", (socket: Socket) => {
		console.log("User connected");

		socket.on("moved", async (data) => {
			console.log("Data", data);
			io.emit("updated", {
				...data,
				lastUpdated: new Date(),
			});
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
		});
	});

	server.listen(PORT, () => {
		console.log(`[⚡] Server started on http://localhost:${PORT}`);
	});
};

main().catch((err) => console.error(err));
