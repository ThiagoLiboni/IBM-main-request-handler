import { UserData } from "../utils/contracts";
declare class UserAuth {
    private authorize;
    private redisClient;
    private constructor();
    static initialize(data: UserData, database_connection: any): Promise<UserAuth>;
    login(): Promise<any>;
    logout(): Promise<any>;
}
export default UserAuth;
