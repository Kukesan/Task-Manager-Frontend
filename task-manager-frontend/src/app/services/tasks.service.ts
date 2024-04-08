import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../models/tasklist.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http : HttpClient) { }

  baseUrl = 'this.apiUrl' + "/Tasks";

  getAllCards():Observable<TaskList[]>{ 
    console.log(this.baseUrl);
    return this.http.get<TaskList[]>(this.baseUrl);
  }

  addCard(task:TaskList):Observable<TaskList>{
    return this.http.post<TaskList>(this.baseUrl,task);
  }
}
