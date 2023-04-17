import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import {AppModule} from "../../app.module";

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let dialogRefSpy: jest.Mocked<MatDialogRef<AddTaskComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,AppModule],
      declarations: [AddTaskComponent],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: dialogRefSpy
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'Test Data'
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form group', () => {
    expect(component.formTask).toBeTruthy();
  });

  it('should have a valid form when title and description are filled', () => {
    component.formTask.setValue({title: 'Test Title', description: 'Test Description'});
    expect(component.formTask.valid).toBeTruthy();
  });


  it('should have an invalid form when title is not filled', () => {
    component.formTask.setValue({title: '', description: 'Test Description'});
    expect(component.formTask.valid).toBeFalsy();
  });

  it('should have a valid form when description is not filled', () => {
    component.formTask.setValue({title: 'Test Title', description: ''});
    expect(component.formTask.valid).toBeTruthy();
  });

});
