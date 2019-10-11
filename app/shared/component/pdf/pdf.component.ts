import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-pdf',
    templateUrl: './pdf.component.html',
    styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<PdfComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            console.log(data);
        }

    ngOnInit() {
    }

}
