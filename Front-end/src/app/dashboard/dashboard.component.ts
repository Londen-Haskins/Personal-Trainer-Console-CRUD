import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users?: User[];
  selectedUser: User = {};
  newUser: User = {};
  userUp: boolean = false;
  userCr: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    })

  }

  createOrUpdateUser(form: NgForm) {
    if (this.selectedUser && this.selectedUser.id) {
      form.value.id = this.selectedUser.id;
      this.apiService.updateUser(form.value).subscribe((user: User) => {
        console.log("User updated", user);
        this.userUp = false;
      });
    }
    else {

      this.apiService.createUser(form.value).subscribe((user: User) => {
        console.log("User created, ", user);
        this.userCr = false;
      });
    }

  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.userUp = true;
    this.userCr = false;
  }

  deleteUser(id: any) {
    this.apiService.deleteUser(id).subscribe((user: User) => {
      console.log("User deleted, ", user);
    });
  }

  toggleCreate() {
    this.userCr = true;
    this.userUp = false;
  }

}
