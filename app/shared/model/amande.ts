import { Vehicule } from './vehicule.model';
import { Employee } from './employee.model';
import { Site } from './site.model';
import { Conducteur } from './conducteur';

export enum Statut { Amende_non_affecte, Site_affecte, Conducteur_affecte, Amende_accepte, Acceptation_envoye }
export class Amande {
    amendeId: string;
    num_Avis: string;
    date_Avis: string;
    date_Infraction: string;
    lieu_Infraction: string;
    montant: string;
    fiche_Amende: string;
    description: string;
    num_Agent: string;
    codeService_Agent: string;
    vehicule: Vehicule = new Vehicule();
    vehiculeId: string;
    employee: Employee;
    employeeId: string;
    conducteur: Conducteur = new Conducteur();
    conducteurId: string;
    userModification: string;
    dateModification: string;
    statut: Statut;
    site: Site;
    siteId: string;
    creation: Date;

    constructor() {
        this.employee = new Employee();
        this.site = new Site();
        this.conducteurId = '';
    }
}
