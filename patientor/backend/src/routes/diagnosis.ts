import type { Diagnosis } from '../types.ts';
import express, { type Response } from 'express';
import diagnoseService from '../services/diagnoseService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnoseService.getDiagnosisEntries());
});

export default router;