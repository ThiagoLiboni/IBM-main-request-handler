import { Person, UserData } from "../utils/contracts";
export declare namespace Services {
    namespace userAuth {
        const toLogin: (data: UserData) => Promise<any>;
        const toLogout: (data: UserData) => Promise<any>;
    }
    namespace User {
        const Create: (data: Person) => Promise<{
            Error: number;
            Details: any;
        } | {
            Error: string;
            Details: string;
        } | {
            ok: boolean;
            data: any;
        } | undefined>;
        const Get: (filter?: object, id?: string) => Promise<{
            Error: number;
            Details: any;
        } | {
            Error: string;
            Details: string;
        } | {
            ok: boolean;
            data: import("axios").AxiosResponse<any, any>;
        } | undefined>;
        const GetAll: (filter: object) => Promise<{
            Error: number;
            Details: any;
        } | {
            Error: string;
            Details: string;
        } | {
            ok: boolean;
            data: import("axios").AxiosResponse<any, any>;
        } | undefined>;
        const Delete: (id: string) => Promise<{
            Error: number;
            Details: any;
        } | {
            Error: string;
            Details: string;
        } | {
            ok: boolean;
            message: string;
        } | undefined>;
        const Update: (data: Person, id: string) => Promise<{
            Error: number;
            Details: any;
        } | {
            Error: string;
            Details: string;
        } | {
            ok: boolean;
            data: import("axios").AxiosResponse<any, any>;
        }>;
    }
    namespace Agenda {
        namespace Policy {
            const Create: () => Promise<void>;
            const Get: () => Promise<void>;
            const Delete: () => Promise<void>;
            const Update: () => Promise<void>;
        }
        namespace Client {
            const Create: () => Promise<void>;
            const Get: () => Promise<void>;
            const Delete: () => Promise<void>;
            const Update: () => Promise<void>;
        }
    }
}
