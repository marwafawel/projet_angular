import { Component } from '@angular/core';
import { VehiculeService } from '../core/services/vehicule.service';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicule } from '../shared/model/vehicule.model';
import { EmployeeService } from '../core/services/employee.service';
import { Site } from '../shared/model/site.model';
import { from } from 'rxjs';
import { SiteService } from '../core/services/site.service';
import { VehiculeConducteur } from '../shared/model/vehicule-conducteur';
import { Employee } from '../shared/model/employee.model';
import { DocVehicule } from '../shared/model/doc-vehicule';
import { Contrat } from '../shared/model/contrat';
import { EmployeSite } from '../shared/model/employe-site';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { PdfComponent } from '../shared/component/pdf/pdf.component';
import { ContratService } from '../core/services/contrat.service';
import { Conducteur } from '../shared/model/conducteur';
import { ConducteursService } from '../core/services/conducteurs.service';

@Component({
    templateUrl: 'vehicule.component.html',
    providers: [VehiculeService, EmployeeService]
})
export class VehiculeComponent {
    post: Vehicule = new Vehicule();
    list_employe_site_vehicule: VehiculeConducteur[] = [];
    list_documents: DocVehicule[] = [];
    sites: Site[];
    employee: Employee[];
    conducteurs: Conducteur[];
    image: any = null;
    Titre: string;
    contrat: Contrat;

    //rpeat row  
    public invoiceForm: FormGroup;

    constructor(
        private vehiculeservice: VehiculeService,
        private _fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private employeeservice: EmployeeService,
        protected sanitizer: DomSanitizer,
        public dialog: MatDialog,
        private siteService: SiteService,
        private contratService: ContratService,
        private conducteurService: ConducteursService
    ) {
        this.siteService.refreshList().subscribe(
            (result) => {
                this.sites = result;
                console.log('this.sites', this.sites);
            }
        );

        //populate liste of employes

        this.employeeservice.refreshListEmployee().subscribe(
            (result) => {
                this.employee = result;
                console.log('this.employee', this.employee);
            }
        );
        this.conducteurService.get().subscribe(
            (result: Conducteur[]) => {
                this.conducteurs = result;
                console.log('this.conducteurs', this.conducteurs);
            }
        );
    }
    
    formattedDate(d) {
        let dd = d.getDate();
        let mm = d.getMonth() + 1;
        let yyyy = d.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let myDate = yyyy + '-' + mm + '-' + dd;
        return myDate;
    }
    ngOnInit(): void {
        // this.employeeservice.refreshList();

        this.resetForm();

        this.invoiceForm = this._fb.group({
            itemRows: this._fb.array([this.initItemRows()])
        });
        //edit
        var id = this.route.params.subscribe(params => {
            var id = params['vehiculeId'];

            //this.title = id ? 'Edit User' : 'New User';

            if (!id)
                return;

            this.contratService.getByIdVehicule(id).subscribe(
                (result: Contrat) => {
                    this.vehiculeservice.selectedcontrat = result
                   this.vehiculeservice.selectedcontrat.date_Debut = this.formattedDate(new Date(this.vehiculeservice.selectedcontrat.date_Debut));
                    this.vehiculeservice.selectedcontrat.date_Fin = this.formattedDate(new Date(this.vehiculeservice.selectedcontrat.date_Fin));
                },
                error => console.log(error)
            );
            this.vehiculeservice.getvehicule(id)
                .subscribe((response: Vehicule) => {
                    console.log("response==============================", response);
                    this.post = response;
                    this.image = response.documents;
                    this.vehiculeservice.selectedVehicule = Object.assign({}, response);
                    this.vehiculeservice.selectedVehicule.file = new DocVehicule();


                    this.vehiculeservice.getDocumentByVehiculeid(this.vehiculeservice.selectedVehicule.vehiculeId)
                        .subscribe(
                            (resultdoc: DocVehicule[]) => {
                                console.log("resultdoc==============================", resultdoc);
                                //afficher liste 
                                this.list_documents.push(...resultdoc);
                            },
                            (error) => { }
                        );



                    this.vehiculeservice.selectedVehicule.vehicule_employee = new VehiculeConducteur();
                    this.vehiculeservice.getconducteur_vehicule(this.vehiculeservice.selectedVehicule.vehiculeId)
                        .subscribe(
                            (result1: VehiculeConducteur[]) => {
                                console.log("result1==============================", result1);
                                //afficher liste 
                                this.list_employe_site_vehicule.push(...result1);
                            },
                            (error) => { }
                        );

                });
        });




    }
    //add row 
    get formArr() {
        return this.invoiceForm.get('itemRows') as FormArray;
    }
    addNewRow() {
        console.log(this.vehiculeservice.selectedVehicule.vehicule_employee);
        const copy = Object.assign({}, this.vehiculeservice.selectedVehicule.vehicule_employee);
        console.log(copy);
        this.list_employe_site_vehicule.push(copy);
        this.vehiculeservice.selectedVehicule.vehicule_employee = new VehiculeConducteur();
    }
    addListeEmployevehicule(vehicule: Vehicule) {

        const rootURL = 'https://localhost:10100/api';
        //je vais parcourir la liste et 
        this.list_employe_site_vehicule.forEach(employeVehicule => {
            employeVehicule.vehiculeId = vehicule.vehiculeId;
            this.vehiculeservice.PostEmployeeVehiculeAsync(employeVehicule).subscribe(
                result => console.log('PostEmployeeSiteAsync success')
            );
        })
    }
    addListedoc(vehicule: Vehicule) {

        const rootURL = 'https://localhost:44395/api';
        //je vais parcourir la liste et 
        this.list_documents.forEach(postdocument => {
            postdocument.vehiculeId = vehicule.vehiculeId;
            this.vehiculeservice.PostdocumentAsync(postdocument).subscribe(
                result => console.log('PostEmployeeSiteAsync success')
            );
        })
    }



    initItemRows() {
        return this._fb.group({
            itemname: ['']
        });
    }









    resetForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.vehiculeservice.selectedVehicule = {
            vehiculeId: null,
            type_vehicule: '',
            Nombre_place: '',
            matricule: '',
            modele: '',
            marque: '',
            annee: '',
            numero_chassis: '',
            couleur: '',
            nombre_porte: '',
            type_Carburent: '',
            transmission: '',

            puissance: '',
            kilometrage: '',
            nombre_Chevaux: '',
            documents: '',
            valide: '',
            contracts: new Contrat(),
            constat: '',
            amende: '',
            userModification: '',
            dateModification: '',
            employe_site: new EmployeSite(),
            vehicule_employee: new VehiculeConducteur(),
            file: new DocVehicule()
        }
        this.vehiculeservice.selectedcontrat = {
            contractId: '',
            type: '',
            date_Debut: '',
            date_Fin: '',
            fournissseur: '',
            vehicule: new Vehicule(),
            vehiculeId: '',
            userModification: '',
            dateModification: '',

        }
    }



    onSubmit(form: NgForm) {
        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        console.log('user:', user);
        this.vehiculeservice.selectedVehicule.userModification = user.id;
        console.log('this.image:', this.image);
        console.log('form', form);
        form.value['documents'] = this.image;

        console.log('form[documents] ', form['documents']);

        if (this.vehiculeservice.selectedVehicule.vehiculeId == null)
            this.insertRecord(form);
        else
            this.updateRecord(form);

    }

    addNewRowdoc() {
        //console.log(this.vehiculeservice.selectedVehicule.file);
        const copy = Object.assign({}, this.vehiculeservice.selectedVehicule.file);
        //console.log(copy);
        this.list_documents.push(copy);
        this.vehiculeservice.selectedVehicule.file = new DocVehicule();
    }



    insertRecord(form: NgForm) {
        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        form.value.userModification = user.id;
        this.vehiculeservice.PostVehiculeAsync(form.value).subscribe(
            (res: Vehicule) => {

                /**/
                form.value.vehiculeId = res.vehiculeId;
                this.vehiculeservice.PostcontratAsync(form.value).subscribe(
                    (result: Contrat) => {
                        console.log('resultttttttttttttttt===========================', result);

                        //this.toastr.success('Submitted successfully', 'Payment Detail Register');

                        this.addListedoc(res);
                        console.log('documents===========================', res);

                        this.addListeEmployevehicule(res);


                       // this.router.navigate(['/vehicule/cards']);
                        this.resetForm(form);

                        //this.toastr.success('Submitted successfully', 'Payment Detail Register');
                        //this.vehiculeservice.refreshListVehicule();

                    },
                    err => { console.log(err); }
                )
            },
            err => { console.log(err); }
        )
    }

    updateRecord(form: NgForm) {
        this.vehiculeservice.putPaymentDetail().subscribe(
            (res: Vehicule) => {
                this.addListedoc(this.vehiculeservice.selectedVehicule);
                this.addListeEmployevehicule(this.vehiculeservice.selectedVehicule);

                this.contratService.put(this.vehiculeservice.selectedcontrat).subscribe(
                    (result: Contrat) => {
                        this.router.navigate(['/vehicule/cards']);
                    },
                    err => { console.log(err); }
                )

                // this.resetForm(form);
                // this.toastr.info('Submitted successfully', 'Payment Detail Register');
                //this.vehiculeservice.refreshListVehicule();
            },
            err => {
                console.log(err);
            }
        )


    }

    //documnts
    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // this.image = reader.result;
                this.vehiculeservice.selectedVehicule.file.fichier = reader.result.toString();
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }



    getSiteNameById(siteId) {
        const site = this.sites.find(site => site.siteId == siteId);
        if (site)
            return site.nom_Site
        else
            return '';
    }
    getconducteurNameById(conducteurId){
        const conducteur = this.conducteurs.find(conducteur => conducteur.conducteurId == conducteurId)
         if(conducteur)
          return conducteur.nom
           else
          return '';
    }

    delete_doc_Row(id) {
        for (let i = 0; i < this.list_documents.length; ++i) {
            if (this.list_documents[i].documentId === id) {
                this.vehiculeservice.deletedocument(id)
                    .subscribe(res => {
                        debugger;
                    },
                    )
                this.list_documents.splice(id, 1);
            }
        }
    }
    deleteRow(id) {
        for (let i = 0; i < this.list_employe_site_vehicule.length; ++i) {
            if (this.list_employe_site_vehicule[i].id === id) {
                this.vehiculeservice.deleteliste_empl_vehicule(id)
                    .subscribe(res1 => {
                        debugger;
                    },
                    )
                this.list_employe_site_vehicule.splice(id, 1);
            }
        }
    }

    viewPDF(pdf): void {
        const dialogRef = this.dialog.open(PdfComponent, {
          width: 'auto',
          data: {pdf: pdf}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }





      onDelete(vehiculeId) {
        if (confirm('Are you sure to delete this record ?')) {
          this.vehiculeservice.deletevehicule(vehiculeId)
            .subscribe(res => {
                this.router.navigate(['/vehicule/cards']);
               
            },
              err => {
             
                console.log(err);
              })
        }
      }
}
