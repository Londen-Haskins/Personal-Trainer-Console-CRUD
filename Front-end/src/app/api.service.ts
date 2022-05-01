import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://18.188.122.85";
  constructor(private httpClient: HttpClient) { }

  readUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  getUser(id: number) {
    const httpPar = new HttpParams().set('id', id);
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/getUser.php`, { params: httpPar } );
  }

  createUser(User: User): Observable<User> {
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/create.php`, User);
  }

  updateUser(User: User) {
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/api/update.php`, User);
  }

  createWork(User: User): Observable<User> {
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/createWorkout.php`, User);
  }

  updateWork(User: User) {
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/api/updateWorkout.php`, User);
  }

  deleteUser(id: number) {
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }

  deleteWorkout(id: number, nKey: number) {
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/api/deleteWorkout.php/?id=${id}&nKey=${nKey}`);
  }
}


