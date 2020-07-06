"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = require("../services/patientsService");
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientsService_1.getPatients());
});
router.get("/:id", (req, res) => {
    res.send(patientsService_1.getPatientById(req.params.id));
});
router.post("/:id/entries", (req, res) => {
    try {
        const newEntry = toNewEntry_1.default(req.body);
        const updatedPatient = patientsService_1.createNewEntry(newEntry, req.params.id);
        res.send(updatedPatient);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient_1.default(req.body);
        const addedPatient = patientsService_1.createPatient(newPatient);
        res.send(addedPatient);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
exports.default = router;
