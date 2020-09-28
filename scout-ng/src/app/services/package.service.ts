import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  userUrl = `${environment.ENDPOINT}/users`;
  packageUrl = `${environment.ENDPOINT}/packages`;
  companyUrl = `${environment.ENDPOINT}/companies`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.http.get<any>(`${this.companyUrl}`);
  }

  getPackages(): Observable<any> {
    return this.http.get<any>(`${this.packageUrl}`);
  }
  createPackage(data) {
    return this.http.post<any>(this.packageUrl, data);
  }

  deletePackage(id) {
    return this.http.delete(`${this.packageUrl}/${id}`);
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.userUrl}`);
  }
}
