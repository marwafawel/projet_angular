import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
//import { NgForm } from '@angular/forms';
import{HttpClientModule}from"@angular/common/http";
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatDialogModule, MatSnackBarModule  } from "@angular/material";
import { CoreModule } from '../core/core.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfComponent } from './component/pdf/pdf.component';
//import { ConducteurComponent } from './model/conducteur/conducteur.component';

@NgModule({
    declarations: [PdfComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
        MatSortModule, MatTableModule,
        CoreModule,
        PdfViewerModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
        MatSortModule, MatTableModule,
        PdfViewerModule,
        MatDialogModule,
        MatSnackBarModule
      //  NgForm
    ],
    entryComponents: [
      PdfComponent
    ]
})
export class SharedModule { }
