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
exports.HistoryController = void 0;
class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    teste() {
        console.log('teste');
    }
    getLastHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const result = yield this.historyService.findLastHistory({ userId });
            res.status(200).send({
                result
            });
        });
    }
    startBreastfeeding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.historyService.startBreastfeeding(req.body);
            res.status(201).send({
                result
            });
        });
    }
    finishBreastfeeding(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.historyService.finishBreastfeeding(req.body);
            res.status(200).send({
                result
            });
        });
    }
    updateBreast(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.historyService.updateBreast(req.body);
            res.status(200).send({
                result
            });
        });
    }
}
exports.HistoryController = HistoryController;
