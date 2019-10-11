// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
//inclue le colapse
import { SiteComponent } from './site.component';

// Theme Routing
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
//import httpmodule 
//import{HttpModule}from '@angular/http';
import{HttpClientModule}from"@angular/common/http";
import { SiteService } from './../core/services/site.service';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";
  import {MatIconModule} from '@angular/material/icon';
import { SiteRoutingModule } from './site-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    FormsModule,
    //HttpModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SharedModule
  ],

  declarations: [
    //inclu le colaps
    SiteComponent
   
  ],
  providers: [SiteService],

 
 
})
export class SiteModule { }
