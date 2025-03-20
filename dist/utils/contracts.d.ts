import { UserLogger } from "authentication-api-ibm/dist/utils/contract";
export interface UserData extends UserLogger {
    id: string;
}
export interface Person {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;
    brokerName?: string;
    brokerCity?: string;
    brokerState?: string;
    brokerPhone?: number;
}
