import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../../shared/model/vehicule.model';
import { DocVehicule } from '../../shared/model/doc-vehicule';
import { Contrat } from '../../shared/model/contrat';
import { environment } from '../../../environments/environment';
import { VehiculeConducteur } from '../../shared/model/vehicule-conducteur';
import { VehiculeInterface } from '../../views/Interface/vehicule.module';

@Injectable({
    providedIn: 'root'
})
export class VehiculeService {
    selectedVehicule: Vehicule;
    selectedcontrat: Contrat;
    list: Vehicule[];
    readonly rootURL = environment.apiURL;

    constructor(private httpClient: HttpClient) { }

    //post
    PostVehiculeAsync(selectedVehicule: Vehicule) {
        return this.httpClient.post(this.rootURL + 'vehicule', selectedVehicule);
    }
    //get 
    refreshListVehicule(): Observable<Vehicule[]> {
        return this.httpClient.get<Vehicule[]>(this.rootURL + 'vehicule');
    }
    deletevehicule(id) {
        return this.httpClient.delete(this.rootURL + 'vehicule/' + id);
    }
    getvehicule(id) {
        let a = this.httpClient.get(this.rootURL + 'vehicule/' + id)
        return a;
    }
    putPaymentDetail() {

        return this.httpClient.put(this.rootURL + 'vehicule/' + this.selectedVehicule.vehiculeId, this.selectedVehicule);
    }

    //service conducteur_vehicule_site
    PostEmployeeVehiculeAsync(employeVehicule: VehiculeConducteur) {
        return this.httpClient.post(this.rootURL + 'conducteur_vehicule', employeVehicule);
    }


    getconducteur_vehicule(vehiculeId) {
        return this.httpClient.get(this.rootURL + 'conducteur_vehicule/' + vehiculeId)
    }


    deleteliste_empl_vehicule(id) {
        return this.httpClient.delete(this.rootURL + 'conducteur_vehicule/' + id);
    }

    //document


    getDocumentByVehiculeid(vehiculeId) {
        return this.httpClient.get(this.rootURL + 'documents/' + vehiculeId)
    }



    PostdocumentAsync(postdocument: DocVehicule) {
        return this.httpClient.post(this.rootURL + 'documents', postdocument);
    }

    deletedocument(id) {
        return this.httpClient.delete(this.rootURL + 'documents/' + id);
    }



    //contrat
    PostcontratAsync(contrat: Contrat) {
        return this.httpClient.post(this.rootURL + 'contract', contrat);
    }

   //get véhicule by siteID
    //let permet de déclarer des variables dont la portée est limitée à celle du bloc dans lequel elles sont déclarées
    //let cannot be re-declared
    getBySite(id) {
        let a = this.httpClient.get(this.rootURL + 'vehicule/site/' + id)
        return a;
    }
}
