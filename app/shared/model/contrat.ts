import { Vehicule } from './vehicule.model';

export class Contrat {
    contractId:string;
    type:string;
    date_Debut:string;
    date_Fin:string;
    fournissseur:string;
    vehicule:Vehicule;
    vehiculeId:string;
    userModification:string;
    dateModification:string;
}
