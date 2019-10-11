import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoixRoutingModule } from './choix-routing.module';
import { ChoixSiteComponent } from './choix-site/choix-site.component';

@NgModule({
  declarations: [ChoixSiteComponent],
  imports: [
    CommonModule,
    ChoixRoutingModule
  ]
})
export class ChoixModule { }
