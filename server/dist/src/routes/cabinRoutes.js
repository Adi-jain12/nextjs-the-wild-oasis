"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cabinController_1 = require("../controllers/cabinController");
const router = (0, express_1.Router)();
router.get('/', cabinController_1.getCabins);
router.get('/:id', cabinController_1.getCabin);
router.get('/price/:id', cabinController_1.getCabinPrice);
exports.default = router;
