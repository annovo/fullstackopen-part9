"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagose_1 = __importDefault(require("./routes/diagose"));
const patient_1 = __importDefault(require("./routes/patient"));
const app = express_1.default();
const PORT = 3001;
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1.default());
app.use("/api/diagnoses/", diagose_1.default);
app.use("/api/patients/", patient_1.default);
app.get("/api/ping", (_req, res) => {
    res.send("pong");
});
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
