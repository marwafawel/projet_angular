import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contrat } from '../../shared/model/contrat';

@Injectable({
    providedIn: 'root'
})
export class ContratService {
    readonly rootURL = environment.apiURL + 'Contract/';

    constructor(
        private http: HttpClient
    ) { }

    getByIdVehicule(vehiculeId) {
        return this.http.get(this.rootURL + 'vehicule/' +  vehiculeId)
    }

    put(contrat: Contrat) {
        return this.http.put(this.rootURL + contrat.contractId, contrat);
    }
}
