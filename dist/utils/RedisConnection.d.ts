import { RedisClientType } from "redis";
export declare class RedisConnection {
    private static instance;
    private constructor();
    static getInstance(): Promise<RedisClientType>;
}
