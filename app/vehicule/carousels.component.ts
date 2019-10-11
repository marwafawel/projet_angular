import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { VehiculeService } from '../core/services/vehicule.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeService } from '../core/services/employee.service';
import { Employee } from '../shared/model/employee.model';

@Component({
  templateUrl: 'carousels.component.html',   
  providers: [VehiculeService ]
    
  
})
export class CarouselsComponent {
  public displayedColumns = ['actions','matricule','Type_vehicule', 'marque', 'modele','puissance','userModification','dateModification'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  utilisateurs: Employee[] = [];


  
  dataSource: any;

  constructor(private vehiculeservice:VehiculeService,
    private utilisateurService: EmployeeService, 
    private changeDetectorRefs: ChangeDetectorRef) {
      this.utilisateurService.get().subscribe(
        (utilisateurs: Employee[]) => this.utilisateurs = utilisateurs,
        error => console.log('error:', error)
    );
    }
   
  
  ngOnInit(): void {
    
    
    
    this.RenderDataTable();

  }

  
  getUserNameById(id) {
    const user: Employee = this.utilisateurs.find(item => item.id == id);
    if (user)
    return user.userName;

    return null;
}
  RenderDataTable() {
    this.vehiculeservice.refreshListVehicule()
      .subscribe(
      res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        //I have referenced object to My DataSource property
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
        console.log(this.dataSource.data);
        
      },
      error => {
        console.log('There was an error while retrieving data !!!' + error);
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  onDelete(vehiculeId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.vehiculeservice.deletevehicule(vehiculeId)
        .subscribe(res => {
         
          this.RenderDataTable();
          //this.vehiculeservice.refreshListVehicule();
         // this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
         
            console.log(err);
          })
    }
  }
}
