import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadFormService } from './upload-form/service/upload-form.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    UploadFormService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
