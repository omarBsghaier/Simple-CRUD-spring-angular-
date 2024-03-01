import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterLinkActive} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import {HttpClientModule} from "@angular/common/http";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    NavbarComponent,
    TutorialsComponent,
    ModalComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    RouterLinkActive,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
