import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Amande } from '../../shared/model/amande';
import { ConducteurSite } from '../../shared/model/ConducteurSite';

@Injectable({
    providedIn: 'root'
})
export class ConducteurSiteService {
    apiUrl = environment.apiURL + 'ConducteurSite/';

    constructor(
        private http: HttpClient
    ) { }

    get() {
        return this.http.get(this.apiUrl);
    }

    getByConducteur(id) {
        return this.http.get(this.apiUrl + id);
    }

    getById(id) {
        return this.http.get(this.apiUrl + id);
    }

    post(conducteurSite: ConducteurSite) {
        return this.http.post(this.apiUrl, conducteurSite);
    }

    put(conducteurSite: ConducteurSite) {
        return this.http.put(this.apiUrl + conducteurSite.id, conducteurSite);
    }

    delete(id) {
        return this.http.delete(this.apiUrl + id);
    }
}
