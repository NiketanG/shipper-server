import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { Ship } from "../Entities/Vessel";
import { __prod__ } from "./constants";

passport.serializeUser((user: any, done: any) => {
	done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
	// User.findById(id, (err, user) => {
	done(null, user);
	// });
});

passport.use(
	new Strategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: __prod__
				? `${process.env.API_HOST}/${process.env.GOOGLE_CALLBACK_URL}`
				: `http://${process.env.HOST || "localhost"}:${
						process.env.PORT || "3000"
				  }/${
						process.env.GOOGLE_CALLBACK_URL ||
						"login/google/callback"
				  }`,
			// passReqToCallback: true,
		},

		async (
			_accessToken: string,
			_refreshToken: string,
			profile: any,
			done: any
		) => {
			if (!profile.emails) {
				return "No Email Address";
			}

			const userExists = await Ship.findOne(profile.emails[0].value);

			if (userExists) {
				return done(undefined, userExists);
			} else {
				const user = await Ship.create({
					email: profile.emails[0].value,
					name: profile.displayName,
					latitude: 17.00919245936354,
					longitude: 73.26783158874858,
					heading: 0,
					speed: 0,
				}).save();
				return done(undefined, user);
			}
		}
	)
);
