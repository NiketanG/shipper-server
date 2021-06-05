import * as TypeORM from "typeorm";
import path from "path";
import { Ship } from "./Entities/Vessel";
import { __prod__ } from "./utils/constants";
import { Session } from "./Entities/Session";

export default {
	type: "postgres",
	entities: [Ship, Session],
	synchronize: !__prod__,
	url: process.env.DATABASE_URL,
	logging: false,
	ssl:
		process.env.DB_ENABLE_SSL === "true"
			? { rejectUnauthorized: false }
			: false,
	migrations: [path.join(__dirname, "./migration/*")],
} as Parameters<typeof TypeORM.createConnection>[0];
