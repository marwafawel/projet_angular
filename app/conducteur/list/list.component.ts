import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ConducteursService } from '../../core/services/conducteurs.service';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../shared/model/employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public displayedColumns = ['actions', 'cin', 'nom', 'prenom', 'sexe', 'telephone', 'userModification', 'dateModification'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  utilisateurs: Employee[] = [];
  //user: Employee = JSON.parse(localStorage.getItem('user'));
  constructor(  private utilisateurService: EmployeeService,
     private conducteurService:ConducteursService, 
    private changeDetectorRefs: ChangeDetectorRef
    ) {
      this.utilisateurService.get().subscribe(
      (utilisateurs: Employee[]) => this.utilisateurs = utilisateurs,
      error => console.log('error:', error)
  ); }

  ngOnInit() {
    this.RenderDataTable();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  RenderDataTable() {
    this.conducteurService.get()
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

onDelete(conducteurId) {
  if (confirm('Are you sure to delete this record ?')) {
      this.conducteurService.delete(conducteurId)
          .subscribe(res => {

              this.RenderDataTable();
              // this.toastr.warning('Deleted successfully', 'Payment Detail Register');
          },
              err => {
                  console.log(err);
              })
  }
}
getUserNameById(id) {
  const user: Employee = this.utilisateurs.find(item => item.id == id);
  if (user)
      return user.userName;

  return null;
}
}
