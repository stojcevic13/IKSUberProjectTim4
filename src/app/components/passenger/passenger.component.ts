import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PassengerService } from 'src/app/services/passenger.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit{
  displayedColumns: string[] = ['name', 'surname', 'telephoneNumber', 'address', 'email'];
  valueFromCreateComponent = '';
  passengers: Passenger[] = [];
  dataSource!: MatTableDataSource<Passenger>;

  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;

  constructor(private passengerService: PassengerService) {}
  ngOnInit(): void {
    this.passengerService.selectedValue$.subscribe((value) => {
      this.valueFromCreateComponent = value;
    });

    this.passengerService.getAll().subscribe((result) => {
      this.passengers = result;
      this.dataSource = new MatTableDataSource<Passenger>(this.passengers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}


export interface Passenger {
  _id: number;
  name: string;
  surname:string;
  telephoneNumber:string;
  address:string;
  email:string;
}
