import express, { type Request, type Response, type NextFunction } from 'express';
import patientService from '../services/patientService.ts';
import  { NewEntrySchema, type PatientEntry, type NewPatientEntry,  type NonSensitivePacientEntry } from '../types.ts';
import data from '../data/patientsEntries.ts';
import z from 'zod';


const router = express.Router();

router.get('/' , (_req, res: Response<NonSensitivePacientEntry[]>) => {
   res.send(patientService.getNonSensitiveEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
   try {
      NewEntrySchema.parse(req.body);
      next();
   } catch(error: unknown){
      next(error);
   }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
   const addedEntry = patientService.addPatient(req.body);
   data.push(addedEntry);
   res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;