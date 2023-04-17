import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {TasksComponent} from "../../components/tasks/tasks.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AppModule} from "../../app.module";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      declarations: [ HomeComponent,TasksComponent ],
      imports: [AppModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
