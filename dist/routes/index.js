"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const history_service_1 = require("../service/history.service");
const router = (0, express_1.Router)();
exports.router = router;
const historyService = new history_service_1.HistoryService();
router.get('/last/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield historyService.findLastHistory({ userId });
    res.status(200).send({
        result,
    });
}));
router.post('/start', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield historyService.startBreastfeeding(req.body);
    res.status(201).send({
        result,
    });
}));
router.put('/finish', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield historyService.finishBreastfeeding(req.body);
    res.status(200).send({
        result,
    });
}));
router.put('/update-breast', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield historyService.updateBreast(req.body);
    res.status(200).send({
        result,
    });
}));
