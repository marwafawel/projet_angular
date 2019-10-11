import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptor/http-interceptor.service';
import { EmployeeService } from './services/employee.service';
import { ConducteursService } from './services/conducteurs.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true
    },
    EmployeeService,
    ConducteursService
  ]
})
export class CoreModule { }
