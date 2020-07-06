"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patientParser_1 = require("./patientParser");
const entryParser_1 = require("./entryParser");
const toBaseEntry = (object) => {
    let newObj = {
        id: uuid_1.v4(),
        description: patientParser_1.parseString(object.description),
        date: patientParser_1.parseDate(object.date),
        specialist: patientParser_1.parseString(object.specialist),
    };
    if (object.diagnosisCodes) {
        const diagnosisCodes = entryParser_1.parseDiagnosisCodes(object.diagnosisCodes);
        newObj = Object.assign(Object.assign({}, newObj), { diagnosisCodes });
    }
    return newObj;
};
const toHospitalEntry = (object) => {
    if (!object.discharge) {
        throw new Error("Missing 'discharge' field");
    }
    return Object.assign(Object.assign({}, toBaseEntry(object)), { type: "Hospital", discharge: {
            date: patientParser_1.parseDate(object.discharge.date),
            criteria: patientParser_1.parseString(object.discharge.criteria),
        } });
};
const toOccupationalHealthcareEntry = (object) => {
    let newObj = Object.assign(Object.assign({}, toBaseEntry(object)), { type: "OccupationalHealthcare", employerName: patientParser_1.parseString(object.employerName) });
    if (object.sickLeave) {
        const sickLeave = {
            startDate: patientParser_1.parseDate(object === null || object === void 0 ? void 0 : object.sickLeave.startDate),
            endDate: patientParser_1.parseDate(object === null || object === void 0 ? void 0 : object.sickLeave.endDate),
        };
        newObj = Object.assign(Object.assign({}, newObj), { sickLeave });
    }
    return newObj;
};
const toHealthCheckContainer = (object) => (Object.assign(Object.assign({}, toBaseEntry(object)), { type: "HealthCheck", healthCheckRating: entryParser_1.parseHealthCheckRate(object.healthCheckRating) }));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object) => {
    switch (object.type) {
        case "Hospital":
            return toHospitalEntry(object);
        case "OccupationalHealthcare":
            return toOccupationalHealthcareEntry(object);
        case "HealthCheck":
            return toHealthCheckContainer(object);
        default:
            throw new Error(`Unhandled discriminated union member: ${JSON.stringify(object)}`);
    }
};
exports.default = toNewEntry;
