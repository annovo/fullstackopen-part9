"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewEntry = exports.getPatientById = exports.createPatient = exports.getPatients = void 0;
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
exports.getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.createPatient = (entry) => {
    const newPatient = Object.assign(Object.assign({}, entry), { id: uuid_1.v4() });
    patients_1.default.push(newPatient);
    const { name, dateOfBirth, gender, occupation, id } = newPatient;
    return { name, dateOfBirth, gender, occupation, id };
};
exports.getPatientById = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
exports.createNewEntry = (entry, id) => {
    const patient = exports.getPatientById(id);
    patient === null || patient === void 0 ? void 0 : patient.entries.push(entry);
    return patient;
};
