import { Router } from "express";
import { Ship } from "../Entities/Vessel";
import passport from "passport";
const MainRouter = Router();

MainRouter.get("/", async (_req, res) => {
	res.status(200).send("Hello World");
});

MainRouter.get("/api/users/current", (req, res) => {
	if (req.user) {
		return res.status(200).json(req.user);
	} else {
		return res.status(401).json({
			code: "NOT_LOGGED_IN",
		});
	}
});

MainRouter.get(
	"/login/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

MainRouter.get(
	"/login/google/callback",
	passport.authenticate("google", { failureRedirect: "/login/google" }),
	function (_req, res) {
		// Successful authentication, redirect home.
		res.redirect(
			`${process.env.FRONTEND_URL || "http://localhost:3000"}/map`
		);
	}
);

MainRouter.get("/ships", async (req, res) => {
	try {
		let ships = await Ship.find({});
		if (req.user) {
			ships = ships.filter(
				(ship) => ship.email !== (req.user as Ship)?.email
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
			message: "Make sure to include all params",
		});
	}
});

export default MainRouter;
