/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
//import { validate, clean } from 'parse-ssn';
import { NewPatientEntry, Gender } from '../types';

const isString = (arg: unknown): arg is string => {
  return typeof arg === 'string';
};

const isDate = (arg: string): boolean => {
  return Boolean(Date.parse(arg));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

// const isSsn = (ssn: any): boolean => {
//  return validate(clean(ssn));
// };

const parseString = (str: unknown): string => {
  if(!str || !isString(str)) {
    throw new Error(`Incorrect or missing argument: ${str}`);
  }
  return str;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing argument: ${date}`);
  }

  return date;
};

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Invalid or missing parameter gender');
  }

  return gender;
};

const parseSsn = (ssn: any): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Invalid or missing ssn');
  }
  return ssn;
};

const toNewPatient = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    occupation: parseString(object.occupation),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn)
  };
};

export default toNewPatient;