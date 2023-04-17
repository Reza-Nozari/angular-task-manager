import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {AddTaskComponent} from "../add-task/add-task.component";
import {ITask} from "../add-task/ITask";
import {ITaskItem} from "./ITaskItem";
import {ITaskColumn} from "./ITaskColumn";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {

  //Store Columns
  taskColumns: Array<ITaskColumn> = new Array<ITaskColumn>();

  constructor(public dialog: MatDialog) {
    //Fill default value
    this.defaultValue();
  }

  defaultValue() {
    this.taskColumns.push(...[
      {
        name: "Tasks",
        status: null,
        list: [
          {
            title: "Implement Task Manager",
            description: "The user should be able to add new tasks with a title and description. ",
            isCompleted: false
          },
          {
            title: "Use TypeScript",
            description: "",
            isCompleted: false
          },
          {
            title: "Implement drag-and-drop",
            description: "Implement drag-and-drop functionality to reorder tasks",
            isCompleted: true
          },
          {
            title: "Angular material",
            description: "Using Angular material CSS to implement the designs",
            isCompleted: false
          },
        ]
      },
      {
        name: "Inprogress", status: null, list: [
          {
            title: "View All Tasks",
            description: "The user should be able to view all tasks in a list view",
            isCompleted: false
          },
          {
            title: "Change Status",
            description: "The user should be able to filter tasks by completion status (completed or not completed). ",
            isCompleted: true
          }
        ]
      },
      {
        name: "done", status: null, list: [
          {
            title: "Mark a Task",
            description: "The user should be able to mark a task as completed. ",
            isCompleted: true
          }
        ]
      },
    ]);

  }

  // Add New Task To List
  onCreateTask(columnName: string): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: columnName,
    });

    dialogRef.afterClosed().subscribe((result: ITask) => {
      if (result) {
        this.taskColumns.find(dr => dr.name == result.name)?.list.push({
          isCompleted: false,
          description: result.description,
          title: result.title
        });
      }
    });
  }

  // When you Move and Transfer card between Columns
  onDrop(event: CdkDragDrop<Array<ITaskItem>, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  //Filter Task List
  onTaskListFilter(column: ITaskColumn, $event: any) {
    switch ($event?.target?.value) {
      case "all":
        column.status = null;
        return;
      case "notCpmpleted":
        column.status = false;
        return;
      case "completed":
        column.status = true;
        return;
      default:
        column.status = null;
        return;
    }
  }

  //IsCompleted Change on your card
  onChangeTaskItemCheck(item: ITaskItem, $event: MatSlideToggleChange) {
    item.isCompleted = $event.checked;
  }

}









