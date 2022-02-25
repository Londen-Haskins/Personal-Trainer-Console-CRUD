import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  curUser: User = {};
  workouts?: User[];
  selectedWork: User = {};
  newWork: User = {exercise:'', weight: 0, sets: 0, reps: 0, notes:''};
  toggleWork: Boolean = false;
  addW: Boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getUser(id).subscribe((list: User[]) => {
      this.workouts = list;
      this.newWork.id = list[0].workoutId;
      this.curUser.name = list[0].name;
      this.curUser.subscription = list[0].subscription;
      console.log(this.workouts);
    })

  }

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

  stopEdit() {
    this.toggleWork = false;
    this.addW = false;
  }

  addWork() {
    this.addW = true;
  }

}
