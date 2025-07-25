import knex from "knex";
import "dotenv/config";

const config = {
    client: process.env.DB_DRIVER || "mysql2",
    connection: {
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "skilltest_shieldtag",
    },
    // pool: {
    //     min: process.env.DB_POOL_MIN || 2,
    //     max: process.env.DB_POOL_MAX || 10
    // }
};

const db = knex(config);

export default db;