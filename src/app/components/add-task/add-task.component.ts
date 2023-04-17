import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ITask} from "./ITask";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

  formTask!:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private  fb:FormBuilder
  ) {
    // Create Form Group For Manager Form
    this.formTask= fb.group({
      title:['',Validators.required],
      description:['']
    });
  }

  //Close The Dialog Modal
  closeForm(): void {
    this.dialogRef.close();
  }

  //Send Form To Tasks Component Then Close
  submitForm() {
    this.dialogRef.close({
      name:this.data,
      title:this.formTask.get("title")?.value,
      description:this.formTask.get("description")?.value
    } as ITask);
  }

}


