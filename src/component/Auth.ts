import { Authenticate } from "auth-ibm-insurances"
import { UserData } from "../utils/contracts"
import dotenv from 'dotenv';
import {RedisConnection} from '../utils/RedisConnection'
import {RedisClientType} from 'redis'
dotenv.config();

class UserAuth {
    private authorize: Authenticate;
    private redisClient: RedisClientType;

    private constructor(data: UserData, database_connection: any, redisClient: RedisClientType) {
        this.redisClient = redisClient;
        this.authorize = new Authenticate({userLogged:data, databaseURL:database_connection, redisClient:this.redisClient});
    }

    public static async initialize(data: UserData, database_connection: any): Promise<UserAuth> {
        const redisClient = await RedisConnection.getInstance();
        return new UserAuth(data, database_connection, redisClient);
    }

    async login(): Promise<any> {

        try {
            const response = await this.authorize.logIn();
            if (response.ok) {
                return { result: response.message};
            }
            throw ({error: `${response.message}`})            
        } catch (err) {
            console.error('Error to resolve the login process >', err);
            return err;
        }
    }

    async logout(): Promise<any> {
        try {
            const result = await this.authorize.logOut();
            return {ok: true, result: result};
        } catch (err) {
            console.error('Error to resolve the logout process', err);
            return err;
        }
    }
}
export default UserAuth