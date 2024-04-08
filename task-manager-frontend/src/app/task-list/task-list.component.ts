import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskList } from '../models/tasklist.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks:TaskList[] = [
    {id:1, title:"Task 1", description:"Description 1", status:"Not Started", dueDate:"2021-10-01"},
    {id:2, title:"Task 2", description:"Description 2", status:"In Progress", dueDate:"2021-10-02"},
    {id:3, title:"Task 3", description:"Description 3 cbgfhfhfhf gfgfhgfhg hfhgfh", status:"Completed", dueDate:"2021-10-03"},
    {id:4, title:"Task 4", description:"Description 4 njkjknnk nknknnn nknkllln nlnlnnlkln nknklnlnlk nklnll njkjknnk nknknnn nknkllln nlnlnnlkln nknklnlnlk nklnll" , status:"Not Started ", dueDate:"2021-10-04"},
    {id:5, title:"Task 5", description:"Description 5", status:"In Progress", dueDate:"2021-10-05"},
    {id:6, title:"Task 6", description:"Description 6", status:"Completed", dueDate:"2021-10-06"},
    {id:7, title:"Task 7", description:"Description 7", status:"Not Started", dueDate:"2021-10-07"},
    {id:8, title:"Task 8", description:"Description 8", status:"In Progress", dueDate:"2021-10-08"},
    {id:9, title:"Task 9", description:"Description 9", status:"Completed", dueDate:"2021-10-09"},
    {id:10, title:"Task 10", description:"Description 10", status:"Not Started", dueDate:"2021-10-10"},
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goCreate() {
    this.router.navigate(['/taskform']);
  }

  goEdit(id:number) {
    this.router.navigate(['/taskform', id]);
  }

  deleteTask(id:number) {
    console.log("Delete Task with id: "+id);
  }
}
