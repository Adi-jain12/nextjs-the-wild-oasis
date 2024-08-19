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
exports.getCabinPrice = exports.getCabin = exports.getCabins = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCabins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cabins = yield prisma.cabins.findMany();
        res.json(cabins);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting cabins' });
    }
});
exports.getCabins = getCabins;
const getCabin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cabin = yield prisma.cabins.findUnique({
            where: { id: Number(id) },
        });
        res.json(cabin);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error loading cabin' });
    }
});
exports.getCabin = getCabin;
const getCabinPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cabin = yield prisma.cabins.findUnique({
            where: { id: Number(id) },
            select: {
                regularPrice: true,
                Discount: true,
            },
        });
        res.json(cabin);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting cabin price' });
    }
});
exports.getCabinPrice = getCabinPrice;
