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
  clientTab: boolean = false;
  workDietTab: boolean = false;
  videoTab: boolean = false;
  homeTab: boolean = true;

  //Variables for workout/diet tab
  curUser: User = {};
  workouts?: User[];
  selectedWork: User = {};
  newWork: User = { exercise: '', weight: 0, sets: 0, reps: 0, notes: '' };
  toggleWork: Boolean = false;
  addW: Boolean = false;

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

  fetchWork(id: any) {
    this.apiService.getUser(id).subscribe((list: User[]) => {
      this.workouts = list;
      this.newWork.id = list[0].workoutId;
      this.curUser.name = list[0].name;
      this.curUser.subscription = list[0].subscription;
      console.log(this.workouts);
    })
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

  //Workout/Diet tab functions
  updateWork(form: NgForm) {

    form.value.id = this.selectedWork.nKey;
    console.log(form.value);
    this.apiService.updateWork(form.value).subscribe((user: User) => {
      console.log("Exercise updated", user);
      this.toggleWork = false;
    });


  }

  createWork(form: NgForm) {
    form.value.id = this.newWork.id;
    console.log(form.value);
    this.apiService.createWork(form.value).subscribe((user: User) => {
      console.log("Exercise created");
      this.addW = false;
    });

  }

  editWork(work: User) {

    this.selectedWork = work;
    this.toggleWork = true;
    this.addW = false;

  }

  deleteWork(id: any, nKey: any) {
    this.apiService.deleteWorkout(id, nKey).subscribe((user: User) => {
      console.log("Workout deleted", user);
    });
  }

  stopEdit() {
    this.toggleWork = false;
    this.addW = false;
  }

  addWork() {
    this.addW = true;
  }

  //Function switches for changing main page content
  switchWorkTab() {
    this.clientTab = false;
    this.workDietTab = true;
    this.videoTab = false;
    this.homeTab = false;
  }

  switchAcctTab() {
    this.clientTab = true;
    this.workDietTab = false;
    this.videoTab = false;
    this.homeTab = false;
  }

  switchHomeTab() {
    this.clientTab = false;
    this.workDietTab = false;
    this.videoTab = false;
    this.homeTab = true;
  }
}
