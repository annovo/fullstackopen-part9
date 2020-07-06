"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const patientParser_1 = require("./patientParser");
const toNewPatient = (object) => {
    return {
        name: patientParser_1.parseString(object.name),
        occupation: patientParser_1.parseString(object.occupation),
        dateOfBirth: patientParser_1.parseDate(object.dateOfBirth),
        gender: patientParser_1.parseGender(object.gender),
        ssn: patientParser_1.parseSsn(object.ssn),
        entries: patientParser_1.parseEntries(object.entries),
    };
};
exports.default = toNewPatient;
