"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controller_1 = require("./controllers/controller");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
exports.routes = routes;
routes.post(`/signIn`, async (req, res, next) => {
    try {
        const result = await controller_1.Services.userAuth.toLogin(req.body);
        if (result.ok) {
            res.status(200).json(result);
        }
        else {
            res.status(401).json({ message: "Login failed" });
        }
    }
    catch (err) {
        next(err);
    }
});
routes.delete(`/signOut`, async (req, res, next) => {
    try {
        const result = await controller_1.Services.userAuth.toLogout(req.body);
        if (result.ok) {
            res.status(200).json({ message: "Logged out successfully" });
        }
        else {
            res.status(400).json({ message: "Logout failed" });
        }
    }
    catch (err) {
        next(err);
    }
});
routes.post(`/createUser`, async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ error: "User data is required" });
        }
        const result = await controller_1.Services.User.Create(req.body);
        if (result && "ok" in result) {
            res.status(200).json(result.data);
        }
        else {
            const status = parseInt(String(result === null || result === void 0 ? void 0 : result.Error)) || 400;
            res.status(status).json((result === null || result === void 0 ? void 0 : result.Details) || { error: "Unknown error" });
        }
    }
    catch (err) {
        next();
    }
});
routes.put(`/updateUser`, async (req, res, next) => {
    try {
        const { id, data } = req.body;
        if (!id || !data) {
            res.status(400).json({ error: "User ID and update data are required" });
        }
        const result = await controller_1.Services.User.Update(data, id);
        if (result && "ok" in result) {
            res.status(200).json(result.data);
        }
        else {
            const status = parseInt(String(result === null || result === void 0 ? void 0 : result.Error)) || 400;
            res.status(status).json((result === null || result === void 0 ? void 0 : result.Details) || { error: "Unknown error" });
        }
    }
    catch (err) {
        next(err);
    }
});
routes.delete(`/deleteUser`, async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ error: "User ID is required" });
        }
        const result = await controller_1.Services.User.Delete(id);
        if (result && "ok" in result) {
            res.status(204).json(result.message);
        }
        else {
            const status = parseInt(String(result === null || result === void 0 ? void 0 : result.Error)) || 400;
            res.status(status).json((result === null || result === void 0 ? void 0 : result.Details) || { error: "Unknown error" });
        }
    }
    catch (err) {
        next(err);
    }
});
routes.get(`/user/:id?`, async (req, res, next) => {
    try {
        const filter = req.query;
        const id = req.params.id;
        let result;
        if (filter && Object.keys(filter).length > 0) {
            result = await controller_1.Services.User.Get(filter);
        }
        if (id) {
            result = await controller_1.Services.User.Get({}, id);
        }
        if (result && "ok" in result) {
            res.status(200).json(result.data);
        }
        else {
            const status = parseInt(String(result === null || result === void 0 ? void 0 : result.Error)) || 400;
            res.status(status).json((result === null || result === void 0 ? void 0 : result.Details) || { error: "Unknown error" });
        }
    }
    catch (err) {
        next(err);
    }
});
routes.get(`/users`, async (req, res, next) => {
    try {
        const filter = req.query;
        if (filter && Object.keys(filter).length > 0) {
            const result = await controller_1.Services.User.GetAll(filter);
            if (result && "ok" in result) {
                res.status(200).json(result.data);
            }
            else {
                const status = parseInt(String(result === null || result === void 0 ? void 0 : result.Error)) || 400;
                res.status(status).json((result === null || result === void 0 ? void 0 : result.Details) || { error: "Unknown error" });
            }
        }
        else {
            throw new Error("the parameters of users filter wasn't defined");
        }
    }
    catch (err) {
        next(err);
    }
});
routes.post(`/clientUser`, controller_1.Services.Agenda.Client.Create);
routes.put(`/clientUser`, controller_1.Services.Agenda.Client.Update);
routes.delete(`/clientUser`, controller_1.Services.Agenda.Client.Delete);
routes.get(`/client`, controller_1.Services.Agenda.Client.Get);
