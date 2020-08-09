import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserDetailsService } from '../service/user-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
declare var $: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  tableHeaders = [
    'id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'
  ];

  tableCellData: any = [];
  // dtOptions: DataTables.Settings = {};
  dataSource = new MatTableDataSource(this.tableCellData);
  @ViewChild(MatSort) sort: MatSort;
  userDetails: FormGroup;
  userName: any;
  email: any;
  phoneNumber: any;
  companyName: any;
  comments: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserDetailsService
    ) { }

  ngOnInit(): void {
    this.userDetails = this.fb.group({
      userName: [''],
      email: [''],
      phoneNumber: [''],
      companyName: [''],
      comments: ['']
    });
/*
    setTimeout(() => {
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    }, 100); */
    // retriveUserDetails() used to retrive userServiceDetails
    this.retriveUserDetails();

  }

  // user click's on submit button
  submitUserDetails() {
    if (this.validateFieldsBeforeSubmit()) {
      // logic after submit
    }
  }

  // validate before submit
  validateFieldsBeforeSubmit(): boolean {
    if (!this.userName || !this.phoneNumber || !this.companyName) {
      alert('User name, Company name and Phone Number is mandatory');
      return false;
    }
    return true;
  }

  retriveUserDetails() {
    this.userService.getUserDetails().subscribe((res: any) => {
      console.log(res);
      this.tableCellData = res;
      // this.dataSource = this.tableCellData;
      this.dataSource = new MatTableDataSource(res);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      }, 100);
    },
    error => {
      console.log('error is ' + error);
    });
  }

  filterData(event: any) {
    console.log(event);
    // const value = event.target.value;
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    /* if (value.startsWith('A') || value.startsWith('B') || value.startsWith('C')) {
      return this.dataSource.filter = value.trim().toLowerCase();
      alert('value is valid' + value);
    } */
  }

  sortData(sort: Sort) {
    /* if (!sort.active || sort.direction === '') {
      return this.dataSource.data;
    }
     */
    this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare( a, b, isAsc);
        case 'name': return this.compare(a, b, isAsc);
        case 'address': return this.compare(a.address.street, b.address.street, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    // return (a < b ? -1 : 1) * (isAsc ? 1 : -1);

    const direction = isAsc ? 1 : -1;
    if (a < b) {
      return -1 * direction;
    }
    if (a > b) {
      return  direction;
    }
    return 0;
  }
}
