import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-pacakge-list',
  templateUrl: './pacakge-list.component.html',
  styleUrls: ['./pacakge-list.component.scss'],
})
export class PacakgeListComponent implements OnInit {
  companies: any = [];
  users: any = [];
  packages: any = [];
  packageForm: FormGroup;
  submitted = false;
  constructor(
    private service: PackageService,
    private formBuilder: FormBuilder
  ) {}

  createPackage() {
    console.log(this.packageForm.value);
    const packageData = {
      order_number: this.packageForm.value.order_number,
      awb: this.packageForm.value.awb,
      weight: this.packageForm.value.weight,
      value: this.packageForm.value.value,
      delivery_company_id: +this.packageForm.value.delivery_company_id,
      created_by: +localStorage.getItem('userId'),
    };
    if (this.packageForm.invalid) {
      return;
    }
    this.service.createPackage(packageData).subscribe((res) => {
      console.log('Created', res);
      this.getPackages();
    });
  }

  deletePackage(id) {
    this.service.deletePackage(id).subscribe((res) => {
      console.log(res);
      this.getPackages();
    });
  }

  getCompanies() {
    this.service.getCompanies().subscribe((res) => {
      console.log(res);
      this.companies = res.data.companies;
    });
  }

  getPackages() {
    this.service.getPackages().subscribe((res) => {
      console.log(res);
      this.packages = res.data.packages;
    });
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res.data.users;
    });
  }

  get f() {
    return this.packageForm.controls;
  }

  ngOnInit(): void {
    this.packageForm = this.formBuilder.group({
      order_number: ['', [Validators.required]],
      delivery_company_id: ['', [Validators.required]],
      awb: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });

    this.getCompanies();
    this.getUsers();
    this.getPackages();
  }
}
