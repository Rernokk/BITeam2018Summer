import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Routes, RouterModule, provideRoutes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ApiExampleComponent } from './components/api-example/api-example.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiExampleComponent
  ],
  imports: [
	  BrowserModule,
	  FormsModule,
	  HttpClientModule,
	  BrowserAnimationsModule,
	  MaterialModule,
	  ReactiveFormsModule,
	  FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
