import { VehiculeConducteur } from './vehicule-conducteur';
import { DocVehicule } from './doc-vehicule';
import { Contrat } from './contrat';
import { EmployeSite } from './employe-site';

export class Vehicule {
    vehiculeId:string;
    type_vehicule:string;
    matricule:string;
    Nombre_place:string;
    modele:string;
    marque:string;
    annee:string;
    numero_chassis:string;
    couleur:string;
    nombre_porte:string;
    type_Carburent:string;
    transmission:string;
    puissance:string;
    kilometrage:string;
    nombre_Chevaux:string;
   documents:string;
  
    valide:string;
    contracts:Contrat=new Contrat();
    constat:string;
    amende:string;
    userModification:string;
    dateModification:string;
    vehicule_employee: VehiculeConducteur = new VehiculeConducteur();
    employe_site: EmployeSite = new EmployeSite();
    file: DocVehicule = new DocVehicule();
    
    
}
