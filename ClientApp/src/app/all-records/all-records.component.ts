import { Component, OnInit } from '@angular/core';
import { IRecord } from '../IRecord';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-all-records',
  templateUrl: './all-records.component.html',
  styleUrls: ['./all-records.component.css'],
})
export class AllRecordsComponent implements OnInit {
  public allBirthdayRecords: IRecord[];
  public isEditableFlags: boolean[];

  constructor(private recordService: RecordService) {
    this.isEditableFlags = [];
  }

  ngOnInit() {
    this.getRecords();
  }

  getRecords(): void {
    this.recordService.getRecords().subscribe(records => this.allBirthdayRecords = records);
  }

  add(name: string, date: Date): void {
    name = name.trim();
    if (!name) {
      return;
    } else if (!date) {
      return;
    }
    this.recordService.addRecord({ name, date } as IRecord)
      .subscribe(record => this.allBirthdayRecords.push(record));
  }

  delete(record: IRecord): void {
    this.allBirthdayRecords = this.allBirthdayRecords.filter(r => r !== record);
    this.recordService.deleteRecord(record.id).subscribe();
  }

  save(record: IRecord): void {
    this.changeState(record.id);
    record.name = record.name.trim();
    if (!record.name) {
      return;
    } else if (!record.date) {
      return;
    }
    this.recordService.editRecord(record).subscribe();
  }

  edit(record: IRecord): void {
    this.changeState(record.id);
  }

  changedDate(e): Date {
    let date = e.target.value;
    return date;
  }

  changeState(id: number): void {
    this.isEditableFlags[id] = !this.isEditableFlags[id];
  }

  isEditable(id: number): boolean {
    return this.isEditableFlags[id];
  }

}
