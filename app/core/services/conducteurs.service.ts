import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Conducteur } from '../../shared/model/conducteur';

@Injectable({
  providedIn: 'root'
})
export class ConducteursService {
    selectedconducteur: Conducteur;
  constructor( private http: HttpClient) { }
  get() {
    return this.http.get(environment.apiURL + 'conducteurs');
}


getById(conducteurId) {
    return this.http.get(environment.apiURL + 'conducteurs/' + conducteurId);
}

post(conducteur: Conducteur) {
    return this.http.post(environment.apiURL + 'conducteurs', conducteur);
}


put(conducteur:Conducteur) {
    return this.http.put(environment.apiURL + 'conducteurs/' + conducteur.conducteurId, conducteur);
}



delete(conducteurId) {
    return this.http.delete(environment.apiURL + 'conducteurs/' + conducteurId);
}
}
