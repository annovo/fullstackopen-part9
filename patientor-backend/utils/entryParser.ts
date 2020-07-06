/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HealthCheckRating, DiagnoseEntry } from "../types";
import diagnoseEntries from "../data/diagnoses";
import { isString } from "./patientParser";
import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isDiagnosisCode = (code: unknown): DiagnoseEntry["code"] => {
  if (!isString(code) || !_.find(diagnoseEntries, (d) => d.code === code)) {
    throw new Error("Invalid or missing code");
  }
  return code;
};

export const parseHealthCheckRate = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error("Invalid or missing parameter HealthCheckRating");
  }
  return rating;
};

export const parseDiagnosisCodes = (
  codes: unknown
): Array<DiagnoseEntry["code"]> => {
  if (Array.isArray(codes) && !_.isEmpty(codes)) {
    codes.forEach((c) => isDiagnosisCode(c));
  } else {
    throw new Error("Codes should be an array");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};
