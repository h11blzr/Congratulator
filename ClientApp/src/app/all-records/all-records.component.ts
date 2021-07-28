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
  public newNameValue: string;

  constructor(private recordService: RecordService) {
    this.isEditableFlags = [];
    this.newNameValue = '';
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
      this.newNameValue = name;
      return;
    }
    this.recordService.addRecord({ name, date } as IRecord)
      .subscribe(record => this.allBirthdayRecords.push(record));
    this.newNameValue = '';
  }

  //search(termName: string) {
  //  if (!(termName)) {
  //    return;
  //  }
  //  this.recordService.searchRecord(termName).subscribe();
  //  this.newNameValue = '';
  //}

  delete(record: IRecord): void {
    this.allBirthdayRecords = this.allBirthdayRecords.filter(r => r !== record);
    this.recordService.deleteRecord(record.id).subscribe();
  }

  save(record: IRecord): void {
    if (this.isEmpty(record.name, record.date)) {
      return;
    }
    this.changeState(record.id);
    this.recordService.editRecord(record).subscribe();
  }

  edit(record: IRecord): void {
    this.changeState(record.id);
  }

  changeState(id: number): void {
    this.isEditableFlags[id] = !this.isEditableFlags[id];
  }

  isEditable(id: number): boolean {
    return this.isEditableFlags[id];
  }

  isEmpty(nameField: string, dateField: Date): boolean {
    nameField = nameField.trim();
    if (!nameField) {
      return true;
    } else if (!dateField) {
      return true;
    }
    return false;
  }

}
