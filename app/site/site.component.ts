
import { Component, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SiteService } from './../core/services/site.service';
import { NgForm } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import { Site } from './../shared/model/site.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../shared/model/employee.model';
import { EmployeeService } from '../core/services/employee.service';


@Component({
    templateUrl: 'site.component.html',
    //injecter siteservice
    providers: [SiteService]
})
export class SiteComponent implements OnInit {
    public displayedColumns = ['actions', 'code_Site', 'nom_Site', 'ville', 'telephone', 'userModification', 'dateModification'];
    // indicates we have used the functionality of a material design MatPaginator by creating an object paginator.
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    utilisateurs: Employee[] = [];


    dataSource: any;

    //injecter siteservice

    constructor(
        private siteservice: SiteService,
        private utilisateurService: EmployeeService,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
        this.utilisateurService.get().subscribe(
            (utilisateurs: Employee[]) => this.utilisateurs = utilisateurs,
            error => console.log('error:', error)
        );

    }

    isCollapsed: boolean = true;

    collapsed(event: any): void {
        // console.log(event);
    }

    expanded(event: any): void {
        // console.log(event);
    }
    ngOnInit(): void {


        this.resetForm();
        this.RenderDataTable();

    }
    RenderDataTable() {
        this.siteservice.refreshList()
            .subscribe(
                res => {
                    this.dataSource = new MatTableDataSource();
                    this.dataSource.data = res;
                    this.dataSource.sort = this.sort;
                    //I have referenced object to My DataSource property
                    this.dataSource.paginator = this.paginator;
                    console.log(this.dataSource.data);
                    //reload
                    this.changeDetectorRefs.detectChanges();
                },
                error => {
                    console.log('There was an error while retrieving data !!!' + error);
                });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }





  

    resetForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.siteservice.selectedSite = {
            siteId: null,
            code_Site: '',
            nom_Site: '',
            ville: '',
            province: '',
            courriel: '',
            telephone: '',
            telecopieur: '',
            adresse: '',
            code_postal: '',
            // Nom_Responsable:'',
            userModification: '',
            dateModification: ''
        }

    }




    onSubmit(form: NgForm) {
        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        console.log('user:', user);
        this.siteservice.selectedSite.userModification = user.id;
        if (this.siteservice.selectedSite.siteId == null)
            this.insertRecord(form);
        else
            this.updateRecord(form);

    }

    insertRecord(form: NgForm) {
        const user = <Employee>JSON.parse(localStorage.getItem('user'));
        form.value.userModification = user.id;
        this.siteservice.PostSiteAsync(form.value).subscribe(
            res => {
                this.resetForm(form);
                //this.toastr.success('Submitted successfully', 'Payment Detail Register');
                // this.siteservice.refreshList();
                this.RenderDataTable();

            },
            err => { console.log(err); }
        )
    }
    updateRecord(form: NgForm) {
        this.siteservice.putPaymentDetail().subscribe(
            res => {
                this.resetForm(form);
                // this.toastr.info('Submitted successfully', 'Payment Detail Register');
                //this.siteservice.refreshList();
                this.RenderDataTable();
            },
            err => {
                console.log(err);
            }
        )


    }


    onDelete(siteId) {
        if (confirm('Are you sure to delete this record ?')) {
            this.siteservice.deletesite(siteId)
                .subscribe(res => {
                    debugger;
                    // this.siteservice.refreshList();
                    this.RenderDataTable();
                    // this.toastr.warning('Deleted successfully', 'Payment Detail Register');
                },
                    err => {
                        debugger;
                        console.log(err);
                    })
        }
    }



    populateForm(post: Site) {
        this.siteservice.selectedSite = Object.assign({}, post);
    }

    getUserNameById(id) {
        const user: Employee = this.utilisateurs.find(item => item.id == id);
        if (user)
        return user.userName;

        return null;
    }
}
