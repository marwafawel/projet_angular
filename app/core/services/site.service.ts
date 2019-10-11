import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import site model
import { Site } from '../../shared/model/site.model'
import { environment } from '../../../environments/environment';




@Injectable({
	providedIn: 'root'
})
export class SiteService {
	//créer prporiét
	selectedSite: Site;
	list: Site[];
	readonly rootURL = environment.apiURL;
	constructor(private httpClient: HttpClient) { }

	//Get 
	refreshList(): Observable<Site[]> {
		return this.httpClient.get<Site[]>(this.rootURL + 'site');
	}

	//post
	PostSiteAsync(selectedSite: Site) {
		return this.httpClient.post(this.rootURL + 'site', selectedSite);
	}

	//update
	putPaymentDetail() {
		return this.httpClient.put(this.rootURL + 'site/' + this.selectedSite.siteId, this.selectedSite);
	}

	// delete
	deletesite(id) {
		return this.httpClient.delete(this.rootURL + 'site/' + id);
	}

	//Get by employee
	getByEmployee(employeeId): Observable<Site[]> {
		return this.httpClient.get<Site[]>(this.rootURL + 'site/employee/' + employeeId);
	}
}
