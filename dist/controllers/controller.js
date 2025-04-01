"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_1 = __importDefault(require("../component/Auth"));
const axios_1 = __importDefault(require("axios"));
const middleware_1 = require("../utils/middleware");
dotenv_1.default.config();
const STRING_CONNECTION_PERSON = process.env.API_DATA_PERSON;
const STRING_CONNECTION_DOCS = process.env.API_DATA_DOCS;
var Services;
(function (Services) {
    let userAuth;
    (function (userAuth) {
        userAuth.toLogin = async (data) => {
            try {
                const User = await Auth_1.default.initialize(data, STRING_CONNECTION_PERSON);
                const result = await User.login();
                return result;
            }
            catch (err) {
                throw new Error("Login failed > " + err);
            }
        };
        userAuth.toLogout = async (data) => {
            try {
                const User = await Auth_1.default.initialize(data, STRING_CONNECTION_PERSON);
                const result = await User.logout();
                return result;
            }
            catch (err) {
                throw new Error("Logout failed: " + err);
            }
        };
    })(userAuth = Services.userAuth || (Services.userAuth = {}));
    let User;
    (function (User) {
        const URL = STRING_CONNECTION_PERSON + "/user";
        User.Create = async (data) => {
            try {
                const response = await axios_1.default.post(`${URL}/createUser`, data);
                if (response.data) {
                    return { ok: true, data: response.data };
                }
            }
            catch (error) {
                return (0, middleware_1.axiosErrorHandler)(error);
            }
        };
        User.Get = async (filter = {}, id) => {
            try {
                let result;
                if (Object.keys(filter).length) {
                    const response = await axios_1.default.get(`${URL}/user`, filter);
                    result = response;
                }
                else {
                    const response = await axios_1.default.get(`${URL}/user/${id}`);
                    result = response;
                }
                if (result) {
                    return { ok: true, data: result };
                }
            }
            catch (error) {
                return (0, middleware_1.axiosErrorHandler)(error);
            }
        };
        User.GetAll = async (filter) => {
            try {
                const result = await axios_1.default.get(`${URL}/users`, filter);
                if (result) {
                    return { ok: true, data: result };
                }
            }
            catch (error) {
                return (0, middleware_1.axiosErrorHandler)(error);
            }
        };
        User.Delete = async (id) => {
            try {
                const response = await axios_1.default.delete(`${URL}/deleteUser/${id}`);
                if (response) {
                    return { ok: true, message: "User deleted successfully" };
                }
            }
            catch (error) {
                return (0, middleware_1.axiosErrorHandler)(error);
            }
        };
        User.Update = async (data, id) => {
            try {
                const response = await axios_1.default.put(`${URL}/updateUser/${id}`, data);
                return { ok: true, data: response };
            }
            catch (error) {
                return (0, middleware_1.axiosErrorHandler)(error);
            }
        };
    })(User = Services.User || (Services.User = {}));
    let Agenda;
    (function (Agenda) {
        let Policy;
        (function (Policy) {
            const URL = STRING_CONNECTION_DOCS;
            Policy.Create = async () => { };
            Policy.Get = async () => { };
            Policy.Delete = async () => { };
            Policy.Update = async () => { };
        })(Policy = Agenda.Policy || (Agenda.Policy = {}));
        let Client;
        (function (Client) {
            Client.Create = async () => { };
            Client.Get = async () => { };
            Client.Delete = async () => { };
            Client.Update = async () => { };
        })(Client = Agenda.Client || (Agenda.Client = {}));
    })(Agenda = Services.Agenda || (Services.Agenda = {}));
})(Services || (exports.Services = Services = {}));
