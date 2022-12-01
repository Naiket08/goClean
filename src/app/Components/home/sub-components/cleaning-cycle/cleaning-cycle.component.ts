import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDatabase, ref, update } from 'firebase/database';


interface Room {
  value: string;
  viewValue: string;
}


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-cleaning-cycle',
  templateUrl: './cleaning-cycle.component.html',
  styleUrls: ['./cleaning-cycle.component.scss']
})

export class CleaningCycleComponent implements OnInit {
  form!: FormGroup;
  description: string;
  title: string;
  source: string;
  label: string;

  task: Task = {
    name: 'All week ',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Monday', completed: false, color: 'primary' },
      { name: 'Tuesday', completed: false, color: 'primary' },
      { name: 'Wednesday', completed: false, color: 'primary' },
      { name: 'Thursday', completed: false, color: 'primary' },
      { name: 'Friday', completed: false, color: 'primary' },
      { name: 'Saturday', completed: false, color: 'primary' },
      { name: 'Sunday', completed: false, color: 'primary' },

    ],
  };

  rooms: Room[] = [
    { value: 'kitchen', viewValue: 'Kitchen' },
    { value: 'bed', viewValue: 'Bedroom' },
    { value: 'bath', viewValue: 'Bathroom' },
    { value: 'living', viewValue: 'Livingroom' },
  ];
  roomSelect: any;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CleaningCycleComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.description = data.description;
    this.title = data.title;
    this.source = data.source;
    this.label = data.label;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []]
    });
  }


  save() {
    //add to db
    console.log(this.form!.value);
    const db = getDatabase();
    const UserId = localStorage.getItem('UserID');
    if (this.source === "DB") {
      if (this.roomSelect === 'kitchen') {
        update(ref(db, 'Customers/' + UserId + '/room/'), {
          room1: true
        });
      }
      else if (this.roomSelect === 'living') {
        update(ref(db, 'Customers/' + UserId + '/room/'), {
          room2: true
        });
      }
      else if (this.roomSelect === 'bed') {
        update(ref(db, 'Customers/' + UserId + '/room/'), {
          room3: true
        });
      }
      else if (this.roomSelect === 'bath') {
        update(ref(db, 'Customers/' + UserId + '/room/'), {
          room4: true
        });
      }
    }
    return this.dialogRef.close(this.form!.value);
  }

  close() {
    this.dialogRef.close();
  }

  updateRoom(value: any) {

    this.roomSelect = value;





  }


  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

}
