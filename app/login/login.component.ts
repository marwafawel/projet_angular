import { Component } from '@angular/core';
import { Employee } from '../shared/model/employee.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
    user: Employee = new Employee();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    login() {
        this.http.post('http://localhost:10100/api/employee/login', this.user).subscribe(
            result => {
                localStorage.setItem('jwt', result['token']);
                localStorage.setItem('user', JSON.stringify(result['user']));
                this.router.navigate(['/vehicule']);
            }, error => {
                console.log(error);
            }
        )
    }
}
