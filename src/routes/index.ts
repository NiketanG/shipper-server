import { Router } from "express";
import { Ship } from "../Entities/Vessel";
const MainRouter = Router();

MainRouter.get("/", async (_req, res) => {
	res.status(200).send("Hello World");
});

MainRouter.get("/ships", async (_req, res) => {
	try {
		const ships = await Ship.find({});
		return res.status(200).json(ships);
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			code: "DB_ERROR",
			message: err,
		});
	}
});

export default MainRouter;
