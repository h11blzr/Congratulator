import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IRecord } from '../IRecord';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-all-records',
  templateUrl: './all-records.component.html',
  styleUrls: ['./all-records.component.css'],
  providers: [DatePipe]
})
export class AllRecordsComponent implements OnInit {
  public allBirthdayRecords: IRecord[];

  turnOff: boolean = true;
  isChecked: boolean;

  constructor(private recordService: RecordService, private datePipe: DatePipe) { }

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

    this.changeState();
    record.name = record.name.trim();
    if (!record.name) {
      return;
    } else if (!record.date) {
      return;
    }
    //record.date = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.recordService.editRecord(record).subscribe();
  }

  changeState(): void {
    this.isChecked = !this.isChecked;
    this.turnOff = !this.isChecked;
  }

}
