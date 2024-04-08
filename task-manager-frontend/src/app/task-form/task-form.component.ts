import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskList } from '../models/tasklist.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm:FormGroup;

  constructor(private router: Router, private tasksService: TasksService) { 
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.taskForm.value);
    if (this.taskForm.valid) {
      const taskData: TaskList = this.taskForm.value;
      console.log('Card data:', taskData);

      this.tasksService.addCard(taskData).subscribe(
        (response: any) => {
          console.log(response)
        }
      )
    } else {
      console.log("Form is invalid, display error messages or perform other actions");
    }
  }

  goList(){
    this.router.navigate(['/tasklist']);
  }

}
