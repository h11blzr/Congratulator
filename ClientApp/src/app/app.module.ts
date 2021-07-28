import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BirthdayRecordComponent } from './birthday-record/birthday-record.component';
import { AllRecordsComponent } from './all-records/all-records.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BirthdayRecordComponent,
    AllRecordsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: BirthdayRecordComponent, pathMatch: 'full' },
      { path: 'twoweeks', component: BirthdayRecordComponent},
      { path: 'all-records', component: AllRecordsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
