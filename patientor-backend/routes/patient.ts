import express from "express";
import {
  getPatients,
  createPatient,
  getPatientById,
  createNewEntry,
} from "../services/patientsService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.get("/:id", (req, res) => {
  res.send(getPatientById(req.params.id));
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = createNewEntry(newEntry, req.params.id);
    res.send(updatedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = createPatient(newPatient);
    res.send(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
