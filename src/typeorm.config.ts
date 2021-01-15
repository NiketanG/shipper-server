import * as TypeORM from "typeorm";
import path from "path";
import { Ship } from "./Entities/Vessel";
import { __prod__ } from "./utils/constants";

export default {
	type: "postgres",
	entities: [Ship],
	synchronize: !__prod__,
	url: process.env.DATABASE_URL,
	logging: false,
	migrations: [path.join(__dirname, "./migration/*")],
} as Parameters<typeof TypeORM.createConnection>[0];