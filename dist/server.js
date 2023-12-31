"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = require("./routes");
app.use(express_1.default.json());
app.use('/history', routes_1.router);
app.listen(3333, () => 'server is running on port 3333');
