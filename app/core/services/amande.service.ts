import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Amande } from '../../shared/model/amande';

@Injectable({
    providedIn: 'root'
})
export class AmandeService {
    ocrImageData: string = null;
    isOcr: boolean = false;

    constructor(
        private http: HttpClient
    ) { }

    get() {
        return this.http.get(environment.apiURL + 'amende');
    }

    getById(id) {
        return this.http.get(environment.apiURL + 'amende/' + id);
    }

    getBySite(id) {
        return this.http.get(environment.apiURL + 'amende/site/' + id);
    }

    post(amande: Amande) {
        return this.http.post(environment.apiURL + 'amende', amande);
    }

    put(amande: Amande) {
        return this.http.put(environment.apiURL + 'amende/' + amande.amendeId, amande);
    }

    delete(id) {
        return this.http.delete(environment.apiURL + 'amende/' + id);
    }
}
