import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskList } from '../models/tasklist.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;
  id: number = -1;

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private route: ActivatedRoute) {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    if (this.id != -1) {
      this.tasksService.getTaskById(this.id).subscribe(
        (response: TaskList) => {
          this.taskForm.patchValue(response);
        },
        (error: any) => {
          console.error('Error retrieving task:', error);
        }
      );
    }

    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.taskForm.value);
    if (this.taskForm.valid) {
      const taskData: TaskList = this.taskForm.value;
      console.log('Card data:', taskData);
      if (this.id == -1) {
        this.tasksService.addTask(taskData).subscribe(
          (response: any) => {
            console.log(response)
            
          }
        )
      } else {
        taskData.id = this.id;
        this.tasksService.updateTask(taskData).subscribe(
          (response: any) => {
            console.log(response)
          }
        )
      }
      this.taskForm.reset(); 
    } else {
      console.log("Form is invalid, display error messages or perform other actions");
    }
  }

  goList() {
    this.router.navigate(['/tasklist']);
  }

}
