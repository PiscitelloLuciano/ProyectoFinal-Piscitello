import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { StudentsModule } from './dashboard/pages/students/students.module';
import { CoursesModule } from './dashboard/pages/courses/courses.module';
import { ClassesModule } from './dashboard/pages/classes/classes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoursesModule,
    ClassesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
