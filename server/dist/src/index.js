"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const guestRoutes_1 = __importDefault(require("./routes/guestRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const cabinRoutes_1 = __importDefault(require("./routes/cabinRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get('/hello', (req, res) => {
    res.send('Hi');
});
app.use('/api/v1/guest', guestRoutes_1.default);
app.use('/api/v1/cabin', cabinRoutes_1.default);
app.use('/api/v1/booking', bookingRoutes_1.default);
app.use('/api/v1/settings', settingsRoutes_1.default);
const port = Number(process.env.PORT) || 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
