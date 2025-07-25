import { createClient } from "redis"
import {cmd} from "./winston.js";

const client = createClient({
    url: process.env.REDIS_URL
});

const connectRedis = async () => {
    try {
        await client.connect();
        cmd.log("info", "Connected to Redis successfully");
    } catch (error) {
        cmd.error("Error connecting to Redis:", error);
        throw new Error("Redis connection failed");
    }
}

export { client, connectRedis };