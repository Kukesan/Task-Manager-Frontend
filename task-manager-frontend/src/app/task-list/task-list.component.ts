import { TaskList } from './../models/tasklist.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskView: any;

  tasks: TaskList[] = [];

  constructor(private router: Router, private tasksService: TasksService, protected modalService: ModalService) {
   }  

  ngOnInit(): void {
    this.getAllTasks();
  }

  goCreate() {
    this.router.navigate(['/taskform', -1]);
  }

  getAllTasks() {
    console.log("Get All Tasks");
    this.tasksService.getAllTasks().subscribe(
      (response: TaskList[]) => {
        console.log(response);
        this.tasks = response;
      }
    )
  }

  goEdit(id: number) {
    this.router.navigate(['/taskform', id]);
  }

  deleteTask(id: number) {
    console.log("Delete Task with id: " + id);
    this.tasksService.deleteTask(id).subscribe(
      (response: TaskList) => {
        console.log(response);
        this.getAllTasks();
      }
    )
  }

  openModalAndViewTask(taskId: number): void {
    this.modalService.open('modal-1');
    this.viewTask(taskId);
  }

  viewTask(taskId: number) {
    console.log("View Task with id: " + taskId);
    this.tasksService.getTaskById(taskId).subscribe(
      (response: TaskList) => {
        console.log(response);
        this.taskView = response;
      }
    )
  }

  closeModal() {
    this.modalService.close();
  }
}
