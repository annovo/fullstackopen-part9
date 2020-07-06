"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDiagnosisCodes = exports.parseHealthCheckRate = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const types_1 = require("../types");
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const patientParser_1 = require("./patientParser");
const lodash_1 = __importDefault(require("lodash"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating) => {
    return Object.values(types_1.HealthCheckRating).includes(rating);
};
const isDiagnosisCode = (code) => {
    if (!patientParser_1.isString(code) || !lodash_1.default.find(diagnoses_1.default, (d) => d.code === code)) {
        throw new Error("Invalid or missing code");
    }
    return code;
};
exports.parseHealthCheckRate = (rating) => {
    if (!isHealthCheckRating(rating)) {
        throw new Error("Invalid or missing parameter HealthCheckRating");
    }
    return rating;
};
exports.parseDiagnosisCodes = (codes) => {
    if (Array.isArray(codes) && !lodash_1.default.isEmpty(codes)) {
        codes.forEach((c) => isDiagnosisCode(c));
    }
    else {
        throw new Error("Codes should be an array");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return codes;
};
