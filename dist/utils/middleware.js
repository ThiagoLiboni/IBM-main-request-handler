"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = exports.axiosErrorHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const axiosErrorHandler = (error) => {
    if (axios_1.default.isAxiosError(error)) {
        if (error.response) {
            return {
                Error: error.response.status,
                Details: error.response.data,
            };
        }
        else {
            return {
                Error: "No response from server",
                Details: error.message,
            };
        }
    }
    else {
        throw new Error("Error: " + (error instanceof Error ? error.message : 'Unknown error'));
    }
};
exports.axiosErrorHandler = axiosErrorHandler;
const responseHandler = (res, result) => {
    if (result && "ok" in result) {
        res.status(200).json(result.data);
    }
    else {
        const status = parseInt(String(result === null || result === void 0 ? void 0 : result.Error)) || 400;
        res.status(status).json((result === null || result === void 0 ? void 0 : result.Details) || { error: "Unknown error" });
    }
};
exports.responseHandler = responseHandler;
