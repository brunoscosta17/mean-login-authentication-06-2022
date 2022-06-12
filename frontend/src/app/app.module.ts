// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './shared/services/notification.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { TaskFormComponent } from './modules/task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthenticationComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [BrowserModule],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
