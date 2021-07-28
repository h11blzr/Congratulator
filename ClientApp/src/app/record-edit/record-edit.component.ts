import { Component, OnInit } from '@angular/core';
import { IRecord } from '../IRecord';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.css']
})
export class RecordEditComponent implements OnInit {
  public record: IRecord;

  constructor() { }

  ngOnInit() {
  }

}
