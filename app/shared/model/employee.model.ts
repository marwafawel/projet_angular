import { EmployeSite } from './employe-site';

export class Employee {
    id: string;
    prenom: string;
    nom: string;
    image: string;
    cin: string;
    sexe: string;
    nationalite: string;
    date_Naisance: string;
    adresse: string;
    ville: string;
    province: string;
    codepostal: string;
    cellulaire: string;
    telephone: string;
    contact_Urgence: string;
    tel_Urgence: string;
    courriel: string;
    note: string;
    statut: string;
    userModification: string;
    dateModification: string;


    password: string;
    userName: string;
    roleSpecific: string;

    employe_site: EmployeSite;
}
