import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { Workout } from '../workout';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators'; //Mapping for nested API calls

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  curUser: User = {};
  workouts?: Workout[];
  selectedWork: Workout = {};
  newWork: Workout = {exercise:'', weight: 0, sets: 0, reps: 0, notes:''};
  toggleWork: Boolean = false;
  addW: Boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    //Use forkJoin and mergeMap to call for user info and associated workouts

    this.apiService.getUser(id).subscribe((list: Workout[]) => {
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

}
