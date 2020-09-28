import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss'],
})
export class EditPackageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: PackageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  companies: any = [];
  users: any = [];
  package: any = {};
  packageForm: FormGroup;
  id;

  get f() {
    return this.packageForm.controls;
  }

  updatePackage() {
    console.log(this.packageForm.value);
    const packageData = {
      order_number: this.packageForm.value.order_number,
      awb: this.packageForm.value.awb,
      weight: this.packageForm.value.weight,
      value: this.packageForm.value.value,
      delivery_company_id: +this.packageForm.value.delivery_company_id,
      rejected: this.packageForm.value.rejected ? 1 : 0,
      shipment_lost: this.packageForm.value.shipment_lost ? 1 : 0,
      returned_other_reason: this.packageForm.value.returned_other_reason
        ? 1
        : 0,
      return_processed_by: this.packageForm.value.return_processed_by,
      created_by: this.packageForm.value.created_by,
      return_recieved_at: this.packageForm.value.return_recieved_at,
      delivered_at: this.packageForm.value.delivered_at,
      dispatched_at: this.packageForm.value.dispatched_at,
    };
    if (this.packageForm.invalid) {
      return;
    }

    Object.keys(packageData).forEach(
      (key) => packageData[key] == null && delete packageData[key]
    );

    console.log(packageData);

    this.service.updatePackage(this.id, packageData).subscribe((res) => {
      console.log('Updated', res);
    });
  }

  getCompanies() {
    this.service.getCompanies().subscribe((res) => {
      console.log(res);
      this.companies = res.data.companies;
    });
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res.data.users;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(`${this.id}`);
    });
    this.getCompanies();
    this.getUsers();

    this.service.getOnePackage(this.id).subscribe((res) => {
      console.log('Got one package', res);
      this.packageForm.patchValue(res.data.package);
    });

    this.packageForm = this.formBuilder.group({
      order_number: ['', []],
      delivery_company_id: ['', []],
      awb: ['', []],
      weight: ['', []],
      value: ['', []],
      rejected: ['', []],
      shipment_lost: ['', []],
      returned_other_reason: ['', []],
      return_processed_by: ['', []],
      created_by: ['', []],
      return_recieved_at: ['', []],
      delivered_at: ['', []],
      dispatched_at: ['', []],
    });
  }
}
