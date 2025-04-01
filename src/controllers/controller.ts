import dotenv from "dotenv";
import { Person, UserData } from "../utils/contracts";
import UserAuth from "../component/Auth";
import axios from "axios";
import { axiosErrorHandler } from "../utils/middleware";


dotenv.config();
const STRING_CONNECTION_PERSON = process.env.API_DATA_PERSON
const STRING_CONNECTION_DOCS = process.env.API_DATA_DOCS

export namespace Services {
  export namespace userAuth {
    export const toLogin = async (data: UserData) => {
      try {
        const User = await UserAuth.initialize(data, STRING_CONNECTION_PERSON)
        const result = await User.login();
        return result;
      } catch (err) {
        throw new Error("Login failed > " + err);
      }
    };
    export const toLogout = async (data: UserData) => {
      try {
        const User = await UserAuth.initialize(data, STRING_CONNECTION_PERSON);
        const result = await User.logout();
        return result;
      } catch (err) {
        throw new Error("Logout failed: " + err);
      }
    };
  }
  export namespace User {
    const URL = STRING_CONNECTION_PERSON + "/user";

    export const Create = async (data: Person) => {
      try {
        const response = await axios.post(`${URL}/createUser`, data);
        if (response.data) {
          return { ok: true, data: response.data };
        }
      }catch (error: any) {
        return axiosErrorHandler(error)
      }
    };
    export const Get = async (filter: object = {}, id?: string) => {
      try {
        let result;
        if (Object.keys(filter).length) {
          const response = await axios.get(`${URL}/user`, filter);
          result = response;
        } else {
          const response = await axios.get(`${URL}/user/${id}`);
          result = response;
        }
        if (result) {
          return { ok: true, data: result };
        }
      } catch (error: any) {
        return axiosErrorHandler(error)
      }
    };
    export const GetAll = async (filter: object) => {
      try {
        const result = await axios.get(`${URL}/users`, filter);
        if (result) {
          return { ok: true, data: result };
        }
      }catch (error: any) {
        return axiosErrorHandler(error)
      }
    };
    export const Delete = async (id: string) => {
      try {
        const response = await axios.delete(`${URL}/deleteUser/${id}`);
        if (response) {
          return { ok: true, message: "User deleted successfully" };
        }
      }catch (error: any) {
        return axiosErrorHandler(error)
      }
    };
    export const Update = async (data: Person, id: string) => {
      try {
        const response = await axios.put(`${URL}/updateUser/${id}`, data);
        return { ok: true, data: response };

      }catch (error: any) {
        return axiosErrorHandler(error)
      }
    };
  }
  export namespace Agenda {
    export namespace Policy {
      const URL = STRING_CONNECTION_DOCS;

      export const Create = async () => {};
      export const Get = async () => {};
      export const Delete = async () => {};
      export const Update = async () => {};
    }
    export namespace Client {
      export const Create = async () => {};
      export const Get = async () => {};
      export const Delete = async () => {};
      export const Update = async () => {};
    }
  }
}
