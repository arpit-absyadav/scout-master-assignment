import { Component, OnInit } from '@angular/core';
import { PackageService } from './services/package.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'scout-ng';
  users: any = [];
  constructor(private service: PackageService) {}

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res.data.users;
      localStorage.setItem('userId', this.users[0].id);
    });
  }

  changeUser(id) {
    console.log(id);

    localStorage.setItem('userId', id);
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
