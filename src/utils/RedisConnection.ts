import { RedisClientType, createClient } from "redis";

export class RedisConnection {
    private static instance: RedisClientType | null = null;

    private constructor() {}

    public static async getInstance(): Promise<RedisClientType> {
        if (!this.instance) {
            this.instance = createClient({
                url: process.env.REDIS_URL,
            });
            await this.instance.connect();
            console.log("Connected to Redis server");
        }
        console.log('redis connection already waiting for caches')
        return this.instance;
    }
}