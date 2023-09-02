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
exports.HistoryService = void 0;
const client_1 = require("@prisma/client");
class HistoryService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    teste() {
        console.log('teste');
    }
    findLastHistory({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.history.findFirst({
                include: {
                    breasts: true,
                },
                where: {
                    userId,
                },
                orderBy: {
                    finishedAt: {
                        sort: 'desc',
                    },
                },
            });
            return result;
        });
    }
    getLastNotFinishedHistory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastHistory = yield this.prisma.history.findFirst({
                where: {
                    userId: userId,
                    finishedAt: { equals: null },
                },
            });
            return lastHistory;
        });
    }
    startBreastfeeding(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.history.create({
                data: {
                    userId: input.userId,
                    babyName: input.babyName,
                    startedAt: input.startedAt,
                    finishedAt: input.finishedAt,
                    breasts: {
                        createMany: {
                            data: input.breasts.map((breast) => ({
                                isLeft: breast.isLeft,
                                time: breast.time,
                            })),
                        },
                    },
                },
            });
            return result;
        });
    }
    finishBreastfeeding(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastHistory = yield this.getLastNotFinishedHistory(input.userId);
            if (!lastHistory)
                return undefined;
            const result = yield this.prisma.history.update({
                where: {
                    id: lastHistory.id
                },
                data: {
                    finishedAt: input.finishedAt
                }
            });
            return result;
        });
    }
    updateBreast(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastHistory = yield this.getLastNotFinishedHistory(input.userId);
            if (!lastHistory)
                return undefined;
            const result = yield this.prisma.breastHistory.create({
                data: {
                    historyId: lastHistory.id,
                    isLeft: input.isLeft,
                    time: input.time
                }
            });
            return result;
        });
    }
}
exports.HistoryService = HistoryService;
