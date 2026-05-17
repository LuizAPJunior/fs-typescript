import data from "../data/patientsEntries.ts";
import type { NonSensitivePacientEntry, Patient, NewPatientEntry } from "../types.ts";
import { v1 as uuid } from 'uuid';


const getPatientEntries = (): Patient[] => {
    return data;
};

const getNonSensitiveEntries = (): NonSensitivePacientEntry[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) => 
        ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (newEntry :NewPatientEntry): Patient => {
    const id: string = uuid();
    const newPatientEntry = {
        id,
        ...newEntry
    };
    
    return newPatientEntry;
};

export default { getPatientEntries, getNonSensitiveEntries, addPatient };