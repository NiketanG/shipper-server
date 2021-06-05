import { Router } from "express";
import { __prod__ } from "../utils/constants";
import { Ship } from "../Entities/Vessel";
const MainRouter = Router();

MainRouter.get("/", async (_req, res) => {
	if (!__prod__) {
		console.log("Ping");
	}
	res.status(200).send("Hello World");
});

MainRouter.get("/api/users/current", async (req, res) => {
	if (req.headers.authorization) {
		const ship = await Ship.findOne(req.headers.authorization);
		if (ship) {
			return res.status(200).json(ship);
		} else {
			return res.status(401).json({
				code: "NOT_LOGGED_IN",
			});
		}
	} else {
		return res.status(401).json({
			code: "NOT_LOGGED_IN",
		});
	}
});

MainRouter.post("/api/users/new", async (req, res) => {
	if (req.body.email && req.body.name) {
		const userExists = await Ship.findOne(req.body.email);

		if (userExists) {
			return res.status(200).json(userExists);
		} else {
			const user = await Ship.create({
				email: req.body.email,
				name: req.body.name,
				latitude: req.body.latitude || 17.00919245936354,
				longitude: req.body.longitude || 73.26783158874858,
				heading: req.body.heading || 0,
				speed: req.body.speed || 0,
			}).save();

			return res.status(200).json(user);
		}
	} else {
		return res.status(400).json({
			code: "INVALID_REQUEST",
			message: "Make sure to include all params",
		});
	}
});

MainRouter.get("/ships", async (req, res) => {
	try {
		let ships = await Ship.find({});
		if (req.headers.authorization) {
			ships = ships.filter(
				(ship) => ship.email !== req.headers.authorization
			);
		}
		return res.status(200).json(ships);
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			code: "DB_ERROR",
			message: err,
		});
	}
});

MainRouter.post("/ship", (req, res) => {
	if (
		!(
			req.body.email &&
			req.body.name &&
			req.body.coords?.latitude &&
			req.body.coords?.longitude &&
			req.body.coords?.heading &&
			req.body.coords?.speed
		)
	) {
		res.status(400).json({
			code: "INVALID_REQUEST",
			message: "Make sure to include all params",
		});
	}
});

export default MainRouter;
