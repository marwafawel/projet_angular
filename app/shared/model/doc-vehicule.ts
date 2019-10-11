import { Vehicule } from './vehicule.model';

export class DocVehicule {
  vehiculeId: string;
  documentId: string;
  titre: string;
  choix: string;
  fichier: string;
  vehicule: Vehicule;
  userModification:string
  dateModification:string;
}
