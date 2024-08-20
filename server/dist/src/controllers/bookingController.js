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
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookedDatesByCabinId = exports.getBooking = exports.getAllBookings = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bookings = yield prisma.bookings.findMany({
            where: { guestId: Number(id) },
            select: {
                id: true,
                created_at: true,
                startDate: true,
                endDate: true,
                numNights: true,
                numGuests: true,
                totalPrice: true,
                guestId: true,
                cabinId: true,
                cabin: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                startDate: 'asc',
            },
        });
        res.json(bookings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Bookings could not be loaded' });
    }
});
exports.getAllBookings = getAllBookings;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const bookings = yield prisma.bookings.findMany({
            where: {
                id: Number(id),
            },
        });
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting bookings' });
    }
});
exports.getBooking = getBooking;
const getBookedDatesByCabinId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayISOString = today.toISOString();
    try {
        const bookings = yield prisma.bookings.findMany({
            where: {
                cabinId: Number(id),
                OR: [
                    {
                        startDate: {
                            gte: todayISOString,
                        },
                    },
                    {
                        status: 'Confirmed',
                    },
                ],
            },
        });
        const bookedDates = bookings
            .map((booking) => {
            return (0, date_fns_1.eachDayOfInterval)({
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
            });
        })
            .flat();
        res.json(bookedDates);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting cabin booked dates' });
    }
});
exports.getBookedDatesByCabinId = getBookedDatesByCabinId;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBooking = req.body;
    try {
        const booking = yield prisma.bookings.create({
            data: newBooking,
        });
        res.status(201).json(booking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Booking not be created' });
    }
});
exports.createBooking = createBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const booking = yield prisma.bookings.findUnique({
            where: { id: Number(id) },
        });
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const updatedBooking = yield prisma.bookings.update({
            where: { id: Number(id) },
            data: updatedFields,
        });
        res.json(updatedBooking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Booking could not be updated' });
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBooking = yield prisma.bookings.delete({
            where: { id: Number(id) },
        });
        res.json(deletedBooking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Booking could not be deleted' });
    }
});
exports.deleteBooking = deleteBooking;
