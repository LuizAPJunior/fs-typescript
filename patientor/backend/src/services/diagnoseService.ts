import data from "../data/diagnosesEntries.ts";
import type { Diagnosis } from "../types.ts";

const getDiagnosisEntries = (): Diagnosis[] => {
    return data;
};

const addDiagnose = () => {
    return null;
};

export default  { getDiagnosisEntries, addDiagnose };