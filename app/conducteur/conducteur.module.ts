import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConducteurRoutingModule } from './conducteur-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AmandeService } from '../core/services/amande.service';

import { ListComponent } from './list/list.component';

import { FicheConducteurComponent } from './fiche-conducteur/fiche-conducteur.component';
import { ConducteursService } from '../core/services/conducteurs.service';


@NgModule({
  declarations: [
   
    ListComponent,
    FicheConducteurComponent],
  imports: [
    CommonModule,
    ConducteurRoutingModule,
    SharedModule
  ],
  providers: [ConducteursService],
})
export class ConducteurModule { }
