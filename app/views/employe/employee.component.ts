import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../shared/model/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from '../../shared/model/site.model';
import { SiteService } from '../../core/services/site.service';
import { EmployeSite } from '../../shared/model/employe-site';

@Component({
    templateUrl: 'employee.component.html',
    providers: [EmployeeService]
})
export class EmployeeComponent {
    employee: Employee;
    image: any = null;

    post: Employee = new Employee();
    list_employe_site: EmployeSite[] = [];
    sites: Site[];
    row: EmployeSite =new EmployeSite();
    index:number;
    id: string;
   

    uploadForm: FormGroup;
    public invoiceForm: FormGroup;
    constructor(private employeeservice: EmployeeService,
        private _fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private siteService: SiteService,
        private activatedRoute: ActivatedRoute,
       
    ) {//get liste de site  pour afficher dans le dropdown liste 
        this.siteService.refreshList().subscribe(
            (result) => {
                this.sites = result;
                console.log('this.sites', this.sites);
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
        //image
        this.uploadForm = this._fb.group({
            profile: ['']
        });




        var id = this.route.params.subscribe(params => {
            var id = params['employeeId'];

           

            if (!id)
                return;
              
            this.employeeservice.getEmployee(id)
          
                .subscribe((response: Employee) => {
                    console.log("response==============================", response);
                    this.post = response;
                    this.image = response.image;
                    response.date_Naisance = this.formattedDate(new Date(response.date_Naisance));
                    this.employeeservice.selectedEmployee = Object.assign({}, response);
                    this.employeeservice.selectedEmployee.employe_site = new EmployeSite();

                    //push liste 
                    this.employeeservice.getEmployeSiteByEmploye(this.employeeservice.selectedEmployee.id)
                        .subscribe(
                            (result: EmployeSite[]) => {
                                //afficher liste 
                                this.list_employe_site.push(...result);
                            },
                            (error) => {}
                        );
                });
              });


    }




    get formArr() {
        return this.invoiceForm.get('itemRows') as FormArray;
    }



    initItemRows() {
        return this._fb.group({
            itemname: ['']
        });
    }

    addNewRow() {
        const debut: Date = new Date(this.employeeservice.selectedEmployee.employe_site.date_debut);
        const fin: Date = new Date(this.employeeservice.selectedEmployee.employe_site.date_fin);
        if (debut > fin) {
            alert('date debut doit etre inferieur a date fin !!');
            return;
        }

        console.log(this.employeeservice.selectedEmployee.employe_site);
        const copy = Object.assign({}, this.employeeservice.selectedEmployee.employe_site);
        console.log(copy);
        this.list_employe_site.push(copy);
        //this.employeeservice.selectedEmployee.employe_site = new EmployeSite();
        console.log(this.employeeservice.selectedEmployee);
    }

    deleteRow(idEmployee_Site) {
        for (let i = 0; i < this.list_employe_site.length; ++i) {
            if (this.list_employe_site[i].idEmployee_Site === idEmployee_Site) {
            this.employeeservice.deleteemployeesite(idEmployee_Site)
            .subscribe(res => {
              debugger;
            },
             )
              this.list_employe_site.splice(idEmployee_Site, 1);
            }
        }
    }



    



    


    //image
    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            //console.log('file:', file);
            //this.uploadForm.get('profile').setValue(file);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.image = reader.result;
                console.log(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }



    resetForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.employeeservice.selectedEmployee = {
            id: null,
            prenom: '',
            nom: '',
            image: '',
            cin: '',
            sexe: '',
            nationalite: '',
            date_Naisance: '',
            adresse: '',
            ville: '',
            province: '',
            codepostal: '',
            cellulaire: '',
            telephone: '',
            contact_Urgence: '',
            tel_Urgence: '',
            courriel: '',
            note: '',
            statut: '',
            userModification: '',
            dateModification: '',
            password: '',
            userName: '',
            roleSpecific: '',
            employe_site: new EmployeSite()
        }
        this.list_employe_site = [];

    }
    

    onSubmit(form: NgForm) {
        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        this.employeeservice.selectedEmployee.userModification = user.id;
        console.log('this.image:', this.image);
        console.log('form', form);
        form.value['Image'] = this.image;
        console.log('form[Image] ', form['Image']);
        if (this.employeeservice.selectedEmployee.id == null)
            this.insertRecord(form);
        else
            this.updateRecord(form);

    }



    insertRecord(form: NgForm) {

        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        form.value.userModification = user.id;
        console.log(form.value);
        this.employeeservice.PostEmployeeAsync(form.value).subscribe(
            (res: Employee) => {
                this.addListeEmployeSite(res);
                this.resetForm(form);
                //this.toastr.success('Submitted successfully', 'Payment Detail Register');
                this.employeeservice.refreshListEmployee();
                
            },
            err => { console.log(err); }
        )
    }

    

    updateRecord(form: NgForm) {
        this.employeeservice.putPaymentDetail().subscribe(
            (update: Employee) => {
                this.addListeEmployeSite(this.employeeservice.selectedEmployee);
                
                this.resetForm(form);
                // this.toastr.info('Submitted successfully', 'Payment Detail Register');
                this.employeeservice.refreshListEmployee();
            },
            err => {
                console.log(err);
            }
        )


    }

//sauvgarder la liste employesite 
    addListeEmployeSite(employe: Employee) {

        const rootURL = 'https://localhost:44395/api';
        //je vais parcourir la liste et 
        this.list_employe_site.forEach(employeSite => {
            employeSite.employeeId = employe.id;
            if (employeSite.idEmployee_Site) {
                this.employeeservice.putEmployeeSiteDetail(employeSite).subscribe(
                    result => console.log('PostEmployeeSiteAsync success')
                );
            } else {
                this.employeeservice.PostEmployeeSiteAsync(employeSite).subscribe(
                    result => console.log('PostEmployeeSiteAsync success')
                );
            }
        })
    }
    



    populateForm(employeeId) {
        this.employeeservice.selectedEmployee = Object.assign({}, employeeId);
    }
    //trouver le nom de site by id 
    getSiteNameById(siteId) {
        const site = this.sites.find(site => site.siteId == siteId);
        if (site)
            return site.nom_Site
        else
            return '';
    }
    selectProgresstion(index: number) {
        this.row=Object.assign({}, this.employeeservice.selectedEmployee.employe_site[index]);
      
        this.row.date_debut = this.row.date_debut ? new Date(this.row.date_debut) : null;
        this.row.date_fin = this.row.date_fin ? new Date(this.row.date_fin) : null;
       
        this.index = index;
       
        
             //this.progression.dateDebut = this.progression.dateDebut ? new Date(this.progression.dateDebut) : null;
    }
}
