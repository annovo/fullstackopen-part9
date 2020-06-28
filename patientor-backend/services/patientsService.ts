import patientsData from '../data/patients';
import { v4 as uuid } from 'uuid';
import { NonSensitivePatientsEntry, NewPatientEntry } from '../types';

export const getPatients = (): Array<NonSensitivePatientsEntry> => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export const createPatient = ( entry: NewPatientEntry ): NonSensitivePatientsEntry => {
  const newPatient = {
    ...entry,
    id: uuid()
  };
  patientsData.push(newPatient);
  const { name, dateOfBirth, gender, occupation, id } = newPatient;
  return { name, dateOfBirth, gender, occupation, id };
};