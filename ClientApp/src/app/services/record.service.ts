import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IRecord } from '../IRecord';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpsClient: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private messageService: MessageService) { }

  getRecords(): Observable<IRecord[]> {
    return this.httpsClient.get<IRecord[]>(this.baseUrl + 'api/birthday/all-records').pipe(
      tap(_ => this.messageService.add(`The list is loaded`)),
      catchError(this.handleError<IRecord[]>('getRecords', [])));
  }

  getRecord(id: number): Observable<IRecord> {
    const url = `${this.baseUrl}api/birthday?id=${id}`;
    return this.httpsClient.get<IRecord>(url).pipe(
      tap(_ => this.messageService.add(`Fetched record id=${id}`)),
      catchError(this.handleError<IRecord>(`getRecord id=${id}`)));
  }

  addRecord(record: IRecord): Observable<IRecord> {
    return this.httpsClient.post<IRecord>(this.baseUrl + 'api/birthday/', record).pipe(
      tap((newRecord: IRecord) => this.messageService.add(`Added record w/ id=${newRecord.id}`)),
      catchError(this.handleError<IRecord>('addRecord')));
  }

  deleteRecord(id: number): Observable<IRecord> {
    const url = `${this.baseUrl}api/birthday/${id}`;
    return this.httpsClient.delete<IRecord>(url).pipe(
      tap(_ => this.messageService.add(`Deleted record id=${id}`)),
      catchError(this.handleError<IRecord>('deleteRecord')));
  }

  editRecord(record: IRecord): Observable<any> {
    return this.httpsClient.put(this.baseUrl + 'api/birthday/', record).pipe(
      tap(_ => this.messageService.add(`Saved record w/ id=${record.id}`)),
      catchError(this.handleError<IRecord>('editRecord')));
  }

  //searchRecord(termName: string): Observable<IRecord[]> {
  //  return this.httpsClient.get<IRecord[]>(this.baseUrl + 'api/birthday/all-records').pipe(
  //    tap((filteredList: IRecord[]) => {
  //      filteredList.filter(r => r.name.includes(termName));
  //      this.messageService.add(`The record was found`);
  //    }),
  //    catchError(this.handleError<IRecord[]>('getRecords', [])));
  //}

  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
