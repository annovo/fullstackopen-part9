import { Gender, Entry } from "../types";
//import { validate, clean } from 'parse-ssn';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

enum EntriesType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
}

export const isString = (arg: unknown): arg is string => {
  return typeof arg === "string";
};

export const isDate = (arg: string): boolean => {
  return Boolean(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.exec(arg));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export const isEntry = (entryType: any): entryType is EntriesType => {
  return Object.values(EntriesType).includes(entryType);
};
// const isSsn = (ssn: any): boolean => {
//  return validate(clean(ssn));
// };

export const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing argument`);
  }
  return str;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing argument date`);
  }
  return date;
};

export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Invalid or missing parameter gender");
  }
  return gender;
};

export const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Invalid or missing ssn");
  }
  return ssn;
};

export const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    entries = [];
  }
  if (Array.isArray(entries)) {
    entries.forEach((e) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!isEntry(e.type)) {
        throw new Error("Invalid or missing type of entry");
      }
    });
  } else {
    throw new Error("Invalid type of entries, should be an array");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};
