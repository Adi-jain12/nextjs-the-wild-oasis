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
exports.updateGuest = exports.createGuest = exports.getGuest = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getGuest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const guest = yield prisma.guests.findUnique({
            where: {
                email: email,
            },
        });
        if (!guest)
            throw new Error('Error fetching guest');
        res.json(guest);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting guest' });
    }
});
exports.getGuest = getGuest;
const createGuest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, fullName } = req.body;
        const guest = yield prisma.guests.create({
            data: {
                email,
                fullName,
            },
        });
        res.status(201).json(guest);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});
exports.createGuest = createGuest;
const updateGuest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const guest = yield prisma.guests.update({
            where: { id: Number(id) },
            data: updatedFields,
        });
        res.json(guest);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Guest could not be updated' });
    }
});
exports.updateGuest = updateGuest;
