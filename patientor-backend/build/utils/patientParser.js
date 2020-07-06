"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEntries = exports.parseSsn = exports.parseGender = exports.parseDate = exports.parseString = exports.isEntry = exports.isDate = exports.isString = void 0;
const types_1 = require("../types");
//import { validate, clean } from 'parse-ssn';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
var EntriesType;
(function (EntriesType) {
    EntriesType["HealthCheck"] = "HealthCheck";
    EntriesType["Hospital"] = "Hospital";
    EntriesType["OccupationalHealthcare"] = "OccupationalHealthcare";
})(EntriesType || (EntriesType = {}));
exports.isString = (arg) => {
    return typeof arg === "string";
};
exports.isDate = (arg) => {
    return Boolean(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.exec(arg));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
exports.isEntry = (entryType) => {
    return Object.values(EntriesType).includes(entryType);
};
// const isSsn = (ssn: any): boolean => {
//  return validate(clean(ssn));
// };
exports.parseString = (str) => {
    if (!str || !exports.isString(str)) {
        throw new Error(`Incorrect or missing argument`);
    }
    return str;
};
exports.parseDate = (date) => {
    if (!date || !exports.isString(date) || !exports.isDate(date)) {
        throw new Error(`Incorrect or missing argument date`);
    }
    return date;
};
exports.parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Invalid or missing parameter gender");
    }
    return gender;
};
exports.parseSsn = (ssn) => {
    if (!ssn || !exports.isString(ssn)) {
        throw new Error("Invalid or missing ssn");
    }
    return ssn;
};
exports.parseEntries = (entries) => {
    if (!entries) {
        entries = [];
    }
    if (Array.isArray(entries)) {
        entries.forEach((e) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (!exports.isEntry(e.type)) {
                throw new Error("Invalid or missing type of entry");
            }
        });
    }
    else {
        throw new Error("Invalid type of entries, should be an array");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};
