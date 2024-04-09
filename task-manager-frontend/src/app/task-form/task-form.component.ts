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
  submitMessage: string = '';
  submitStatus:string = 'Submit';

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
          this.submitStatus = 'Update';
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
    let submitMsg = <HTMLElement>document.getElementById("submit-message");
    if (this.taskForm.valid) {
      const taskData: TaskList = this.taskForm.value;
      console.log('Card data:', taskData);
      if (this.id == -1) {
        this.tasksService.addTask(taskData).subscribe(
          (response: any) => {
            console.log(response);
            submitMsg.style.color = 'green';
            this.submitMessage = 'Task added successfully';
          }
        )
      } else {
        taskData.id = this.id;
        this.tasksService.updateTask(taskData).subscribe(
          (response: any) => {
            console.log(response)
            
            submitMsg.style.color = 'green';
            this.submitMessage = 'Task updated successfully';
          }
        )
      }
      this.taskForm.reset(); 
    } else {
      console.log("Form is invalid, display error messages or perform other actions");
      submitMsg.style.color = 'red';
      this.submitMessage = 'Please fill in all the required fields';
    }
  }

  goList() {
    this.router.navigate(['/tasklist']);
  }

}
