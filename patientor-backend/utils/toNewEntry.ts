/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Entry, HospitalEntry, OccupationalHealthcareEntry, 
  HealthCheckEntry, BaseEntry 
} from '../types';
import { v4 as uuid } from 'uuid';
import { parseString, parseDate } from './patientParser';
import { parseDiagnosisCodes, parseHealthCheckRate } from './entryParser';

const toBaseEntry = (object: any): BaseEntry => {
  let newObj: BaseEntry = {
    id: uuid(),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist)
  };
  if(object.diagnosisCodes) {
    const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    newObj = {...newObj, diagnosisCodes };
  }
  return newObj;
};

const toHospitalEntry = (object: any): HospitalEntry => {
  if(!object.discharge) {
    throw new Error("Missing 'discharge' field");
  }

  return ({
    ...toBaseEntry(object),
    type: "Hospital",
    discharge: {
      date: parseDate(object.discharge.date),
      criteria: parseString(object.discharge.criteria)
    }  
  });
};

const toOccupationalHealthcareEntry = (object: any): OccupationalHealthcareEntry => {
  let newObj: OccupationalHealthcareEntry = {
    ...toBaseEntry(object),
    type: "OccupationalHealthcare",
    employerName: parseString(object.employerName),
  };

  if(object.sickLeave) {
    const sickLeave = {
      startDate: parseDate(object?.sickLeave.startDate),
      endDate:parseDate(object?.sickLeave.endDate),
    };
    newObj = {...newObj, sickLeave };
  }
  return newObj;
};

const toHealthCheckContainer= (object: any): HealthCheckEntry => ({
  ...toBaseEntry(object),
  type: "HealthCheck",
  healthCheckRating: parseHealthCheckRate(object.healthCheckRating)
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object: any): Entry => {
  switch(object.type) {
    case "Hospital":
      return toHospitalEntry(object);
    case "OccupationalHealthcare":
      return toOccupationalHealthcareEntry(object);
    case "HealthCheck":
      return toHealthCheckContainer(object);
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(object)}`
      );
  }
};

export default toNewEntry;