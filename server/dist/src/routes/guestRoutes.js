"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guestController_1 = require("../controllers/guestController");
const router = (0, express_1.Router)();
router.get('/', guestController_1.getGuest);
router.post('/', guestController_1.createGuest);
router.patch('/:id', guestController_1.updateGuest);
exports.default = router;
