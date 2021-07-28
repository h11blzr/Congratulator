import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { IRecord } from '../IRecord';

@Component({
  selector: 'app-birthday-record',
  templateUrl: './birthday-record.component.html',
  styleUrls: ['./birthday-record.component.css']
})
export class BirthdayRecordComponent {
  public birthdayRecords: IRecord[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IRecord[]>(baseUrl + 'api/birthday').subscribe(result => {
      this.birthdayRecords = result;
    }, error => console.error(error));
  }

}
