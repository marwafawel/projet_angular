import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee.component';
import { BrandButtonsComponent } from './brand-buttons.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropdownsComponent } from './liste_employee.component';

// Buttons Routing
import { ButtonsRoutingModule } from './buttons-routing.module';
import{HttpClientModule}from"@angular/common/http";

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule  } from "@angular/material";
  
  import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
  import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SiteService } from '../../core/services/site.service';
import { EmployeeService } from '../../core/services/employee.service';
import { SharedModule } from '../../shared/shared.module';
 


// Angular

@NgModule({
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgbModule.forRoot(),
    SharedModule
  ],
  declarations: [
    EmployeeComponent,
    DropdownsComponent,
    BrandButtonsComponent
  ],
  providers: [EmployeeService, SiteService],
})
export class EmployeModule { }
