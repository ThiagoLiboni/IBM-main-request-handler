"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_ibm_insurances_1 = require("auth-ibm-insurances");
const dotenv_1 = __importDefault(require("dotenv"));
const RedisConnection_1 = require("../utils/RedisConnection");
dotenv_1.default.config();
class UserAuth {
    constructor(data, database_connection, redisClient) {
        this.redisClient = redisClient;
        this.authorize = new auth_ibm_insurances_1.Authenticate({ userLogged: data, databaseURL: database_connection, redisClient: this.redisClient });
    }
    static async initialize(data, database_connection) {
        const redisClient = await RedisConnection_1.RedisConnection.getInstance();
        return new UserAuth(data, database_connection, redisClient);
    }
    async login() {
        try {
            const response = await this.authorize.logIn();
            if (response.ok) {
                return { result: response.message };
            }
            throw ({ error: `${response.message}` });
        }
        catch (err) {
            console.error('Error to resolve the login process >', err);
            return err;
        }
    }
    async logout() {
        try {
            const result = await this.authorize.logOut();
            return { ok: true, result: result };
        }
        catch (err) {
            console.error('Error to resolve the logout process', err);
            return err;
        }
    }
}
exports.default = UserAuth;
