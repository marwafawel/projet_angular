import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TesseractWorker } from 'tesseract.js';

import { AmandeService } from '../../core/services/amande.service';
import { Amande } from '../../shared/model/amande';
import { VehiculeService } from '../../core/services/vehicule.service';
import { Vehicule } from '../../shared/model/vehicule.model';
import { MessagerService } from '../../core/services/messager.service';
import { Router } from '@angular/router';
import { Employee } from '../../shared/model/employee.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    amende: Amande;
    //vehicule:Vehicule;
    public displayedColumns = ['actions', 'num_Avis', 'matricule', 'marque', 'Site Destinataire', 'Statut', 'userModification', 'dateModification'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;
    user: Employee = JSON.parse(localStorage.getItem('user'));

    // ocr variable
    public ocrResult;
    public inputedImage = new Image();
    public isImageUploading: Boolean = false;
    public selectedFiles: FileList;
    public selectedFileName: string = "Choose a file";
    public isRecognizing: Boolean = false;
    public progressMessage: String;
    public progressPerce: Number = 0;

    constructor(
        private amendeservice: AmandeService,
        private vehiculeService: VehiculeService,
        private changeDetectorRefs: ChangeDetectorRef,
        private MessagerService: MessagerService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.RenderDataTable();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    //***le probleme : table vehicule est null dans  l objet amende  */
    RenderDataTable() {
        //afficher liste des amende
        this.amendeservice.get().subscribe(
            (amendes: Amande[]) => {
                //afficher liste dse véhicule
                this.vehiculeService.refreshListVehicule().subscribe(
                    (vehicules: Vehicule[]) => {
                        //parcourire liste des amende 
                        amendes.forEach(amende => {
                            //trouver dans le tableau véhicule enregistrement where (v.vehiculeid=amende.véhiculeid) et afficher le resultat dans amende.vehicule
                            amende.vehicule = vehicules.find(v => v.vehiculeId == amende.vehiculeId);
                        })
                        this.dataSource = new MatTableDataSource();
                        this.dataSource.data = amendes;
                        //refresh

                        this.dataSource.sort = this.sort;
                        //I have referenced object to My DataSource property
                        this.dataSource.paginator = this.paginator;
                        console.log(this.dataSource.data);
                        this.changeDetectorRefs.detectChanges();
                    }
                );
            },
            error => {
                console.log('There was an error while retrieving data !!!' + error);
            });
    }

    onDelete(amendeId) {
        if (confirm('Are you sure to delete this record ?')) {
            this.amendeservice.delete(amendeId)
                .subscribe(res => {

                    this.RenderDataTable();
                    // this.toastr.warning('Deleted successfully', 'Payment Detail Register');
                },
                    err => {
                        console.log(err);
                    })
        }
    }

    // ocr methode
    selectFile(event) {
        if (event.target.files[0].size > 2048000) {
            this.MessagerService.openSnackBar("This image should less than 2MB, Please try another Image", 3, null)
            return
        } else {
            if (event.target.files[0].type !== "image/png" && event.target.files[0].type !== "image/jpeg") {
                this.MessagerService.openSnackBar("Selected Rejected, PNG OR JPGE Only", 3, null);
                return
            } else {
                this.ocrResult = null;
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = () => {
                    this.setInputedImageURL(reader.result);
                }
                this.selectedFileName = event.target.files[0].name;
                this.selectedFiles = event.target.files;
                this.MessagerService.openSnackBar("One File Seclected", 3, null);
            }
        }
    }

    setInputedImageURL(_url) {
        this.inputedImage.src = _url;
        this.isImageUploading = false;
        this.ocrResult = null;
    }

    ocrImage() {
        this.isRecognizing = true;
        this.ocrResult = null;
        this.progressMessage = "Preparing for recognizing...";
        const worker = new TesseractWorker();
        worker.recognize(this.inputedImage).progress(progress => {
            // console.log('progress', progress);
            if (progress.status === "recognizing text") {
                this.MessagerService.closeSnackBar();
                this.progressPerce = Math.round(progress.progress * 100);
                this.progressMessage = "Progress:" + this.progressPerce + "%"
            } else {
                return
            }
        }).then(result => {
            // console.log('result', result);
            // this.MessagerService.openSnackBar("The Image has Recongized", 2, null);
            this.ocrResult = result.text
            // console.log('this.ocrResult:', this.ocrResult)
            this.progressPerce = 0;
            this.isRecognizing = false;
            this.progressMessage = null;
            this.amendeservice.isOcr = true;
            this.amendeservice.ocrImageData = result.text;
            this.router.navigate(['/amende/add']);
        });
    }
    // fin ocr methode

    getStatut(amende: Amande) {
        if (amende.fiche_Amende) {
            return 'Acceptation envoyée';
        } else if (amende.conducteurId) {
            return 'Conducteur affecté';
        } else if (amende.siteId) {
            return 'Site affecté ';
        } else { // if (!amende.siteId && !amende.conducteurId)
            return 'Amende non affecté';
        } 
    }
}
