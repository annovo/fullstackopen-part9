/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry } from "../types";
import {
  parseDate,
  parseString,
  parseEntries,
  parseSsn,
  parseGender,
} from "./patientParser";

const toNewPatient = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    occupation: parseString(object.occupation),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
    entries: parseEntries(object.entries),
  };
};

export default toNewPatient;
