import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmandeRoutingModule } from './amande-routing.module';
import { ListComponent } from './list/list.component';
import { FicheComponent } from './fiche/fiche.component';
import { SharedModule } from '../shared/shared.module';
import { AmandeService } from '../core/services/amande.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [ListComponent, FicheComponent],
  imports: [
    CommonModule,
    AmandeRoutingModule,
    SharedModule,
    
    CollapseModule.forRoot(),
  ],
  providers: [AmandeService],
})
export class AmandeModule { }
