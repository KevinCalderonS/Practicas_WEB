import {user} from "./models/user";
import "reflect-metadata";
import {DataSource} from "typeorm";
import { views } from "./models/views";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [user, views],
    migrations: [],
    subscribers: [],  
    }
)