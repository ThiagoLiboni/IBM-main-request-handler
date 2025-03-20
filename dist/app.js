"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = process.env.PORT;
const base = process.env.BASE_prefix || "/";
app.use(express_1.default.json());
app.use(base === null || base === void 0 ? void 0 : base.toString(), routes_1.routes);
app.listen(port, () => {
    console.log('requests server starting:', port);
});
