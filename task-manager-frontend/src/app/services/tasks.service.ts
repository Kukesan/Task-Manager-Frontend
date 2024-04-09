import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../models/tasklist.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http : HttpClient) { }

  baseUrl = 'https://localhost:7177/api/TaskDetails';

  getTaskById(id: number): Observable<TaskList> {
    return this.http.get<TaskList>(this.baseUrl+'/'+id);
  }

  getAllTasks():Observable<TaskList[]>{ 
    console.log(this.baseUrl);
    return this.http.get<TaskList[]>(this.baseUrl);
  }

  addTask(task:TaskList):Observable<TaskList>{
    console.log(task);
    return this.http.post<TaskList>(this.baseUrl,task);
  }

  deleteTask(id:number):Observable<TaskList>{
    return this.http.delete<TaskList>(this.baseUrl+'/'+id);
  }

  updateTask(tasklist:TaskList):Observable<TaskList>{
    return this.http.put<TaskList>(this.baseUrl+'/'+tasklist.id,tasklist);
  }
}
