"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConnection = void 0;
const redis_1 = require("redis");
class RedisConnection {
    constructor() { }
    static async getInstance() {
        if (!this.instance) {
            this.instance = (0, redis_1.createClient)({
                url: process.env.REDIS_URL,
            });
            await this.instance.connect();
            console.log("Connected to Redis server");
        }
        console.log('redis connection already waiting for caches');
        return this.instance;
    }
}
exports.RedisConnection = RedisConnection;
RedisConnection.instance = null;
