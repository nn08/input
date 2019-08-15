import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgStickyDirective } from 'ng-sticky';

import { AppComponent }  from './app.component';
import { DescriptionComponent }  from './description.component';
import { DescriptionService } from './description.service';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material';

@NgModule({
  imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        FormsModule
  ],
  declarations: [
        AppComponent,
        DescriptionComponent,
        NgStickyDirective
  ],
  providers: [
        DescriptionService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
