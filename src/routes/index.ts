import { Router } from "express";
import { Ship } from "../Entities/Vessel";
const MainRouter = Router();

MainRouter.get("/", async (_req, res) => {
	res.status(200).send("Hello World");
});

MainRouter.get("/ships", async (_req, res) => {
	try {
		const ships = await Ship.find({});
		console.log("InitialData", ships);
		return res.status(200).json(ships);
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			code: "DB_ERROR",
			message: err,
		});
	}
});

MainRouter.post("/ship", (req, res) => {
	if (
		req.body.email &&
		req.body.name &&
		req.body.coords?.latitude &&
		req.body.coords?.longitude &&
		req.body.coords?.heading &&
		req.body.coords?.speed
	) {
		console.log(req.body);
	} else {
		res.status(400).json({
			code: "INVALID_REQUEST",
			message: "Make sure to include all params1",
		});
	}
});

export default MainRouter;
