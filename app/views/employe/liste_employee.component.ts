import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeService } from '../../core/services/employee.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from '../../shared/model/employee.model';

@Component({
    templateUrl: 'liste_employee.component.html',
    styleUrls: ['dropdowns.component.css']
})
export class DropdownsComponent {
    utilisateurs: Employee[] = [];

    public displayedColumns = ['actions', 'cin', 'nom', 'prenom', 'sexe', 'telephone', 'userModification', 'dateModification'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;

    constructor(
        private utilisateurService: EmployeeService, private employeeservice: EmployeeService, private _route: ActivatedRoute,
        private _router: Router,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
        this.utilisateurService.get().subscribe(
            (utilisateurs: Employee[]) => this.utilisateurs = utilisateurs,
            error => console.log('error:', error)
        );
    }



    ngOnInit(): void {



        this.RenderDataTable();

    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    RenderDataTable() {
        this.employeeservice.refreshListEmployee()
            .subscribe(
                res => {
                    this.dataSource = new MatTableDataSource();
                    this.dataSource.data = res;
                    //refresh

                    this.dataSource.sort = this.sort;
                    //I have referenced object to My DataSource property
                    this.dataSource.paginator = this.paginator;
                    console.log(this.dataSource.data);
                    this.changeDetectorRefs.detectChanges();
                },
                error => {
                    console.log('There was an error while retrieving data !!!' + error);
                });
    }
    onDelete(id) {
        if (confirm('Are you sure to delete this record ?')) {
            this.employeeservice.deleteemployee(id)
                .subscribe(res => {
                  
                    this.RenderDataTable();
                    // this.toastr.warning('Deleted successfully', 'Payment Detail Register');
                },
                    err => {
                        //debugger;
                        console.log(err);
                    })
        }
    }
    populateForm(post: Employee) {
        this.employeeservice.selectedEmployee = Object.assign({}, post);
    }
    updateRecord(form: NgForm) {
        this.employeeservice.putPaymentDetail().subscribe(
            res => {
                // this.resetForm(form);
                // this.toastr.info('Submitted successfully', 'Payment Detail Register');
                this.employeeservice.refreshListEmployee();
            },
            err => {
                console.log(err);
            }
        )


    }

    getUserNameById(id) {
        const user: Employee = this.utilisateurs.find(item => item.id == id);
        if (user)
            return user.userName;

        return null;
    }



}