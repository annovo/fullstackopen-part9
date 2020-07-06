import diagnoseData from "../data/diagnoses";
import { DiagnoseEntry } from "../types";

export const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoseData;
};
