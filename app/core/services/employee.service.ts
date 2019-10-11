import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Employee } from '../../shared/model/employee.model'
import { from } from 'rxjs';
import { EmployeSite } from '../../shared/model/employe-site';

import { environment } from '../../../environments/environment';

@Injectable()
export class EmployeeService {
    selectedEmployee: Employee;
    selectedEmpsite: EmployeSite;
    list: Employee[];
    list_employe_site: EmployeSite;
    readonly rootURL = environment.apiURL;

    constructor(private httpClient: HttpClient) { }

    
    get(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.rootURL + 'employee');
    }

    post(employee: Employee) {
        return this.httpClient.post(this.rootURL + 'employee', employee);
    }
    //update
    put(employee: Employee) {
        return this.httpClient.put(this.rootURL + 'employee/' + employee.id, employee);
    }

    delete(id) {
        return this.httpClient.delete(this.rootURL + 'employee/' + id);
    }


















    //post
    PostEmployeeAsync(selectedEmployee: Employee) {
        return this.httpClient.post(this.rootURL + 'employee', selectedEmployee);
    }
    //post empliyeSite

    //Get 

    refreshListEmployee(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.rootURL + 'employee');
    }
    deleteemployee(id) {
        return this.httpClient.delete(this.rootURL + 'employee/' + id);
    }
    putPaymentDetail() {

        return this.httpClient.put(this.rootURL + 'employee/' + this.selectedEmployee.id, this.selectedEmployee);
    }
//getbyid
    getEmployee(id) {
        return this.httpClient.get(this.rootURL + 'employee/' + id)
       


    }


    getEmployeSiteByEmploye(employeeId) {
        return this.httpClient.get(this.rootURL + 'employee_site/' + employeeId)
    }


    PostEmployeeSiteAsync(employeSite: EmployeSite) {
        return this.httpClient.post(this.rootURL + 'employee_site', employeSite);
    }
    //delete employee site 
    deleteemployeesite(idEmployee_Site) {
        return this.httpClient.delete(this.rootURL + 'employee_site/' + idEmployee_Site);
    }
    //update employe_site 
    putEmployeeSiteDetail(employeSite: EmployeSite) {

        return this.httpClient.put(this.rootURL + 'employee_site/' + employeSite.idEmployee_Site, this.list_employe_site);
    }

}